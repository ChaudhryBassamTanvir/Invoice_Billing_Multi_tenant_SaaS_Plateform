'use server';

import { z } from 'zod';
// import { query } from './db.server';
import { query } from './db.server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
/* -------------------- VALIDATION -------------------- */

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[-_!@#$%^&*]).{8,}$/;

const nameSchema = z.string().min(3, 'Name must have at least 3 characters');
const emailSchema = z.string().regex(emailRegex, 'Invalid email format');
const passwordSchema = z.string().regex(
  passwordRegex,
  'Password must be strong'
);

const UserSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const InvoiceSchema = z.object({
  customerId: z.string(),
  amount: z.coerce.number().gt(0),
  status: z.enum(['pending', 'paid']),
});

const CustomerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  userEmail: emailSchema,
});

/* -------------------- TYPES -------------------- */

export type InvoiceState = {
  errors?: Record<string, string[]>;
  message?: string | null;
};

export type UserState = {
  errors?: Record<string, string[]> | any;
  message?: string | any;
};

export type CustomerState= {
  errors?: Record<string, string[]>;
  message?: string | null;
};

/* -------------------- INVOICES -------------------- */

export async function createInvoice(
  _: InvoiceState,
  formData: FormData
): Promise<InvoiceState> {
  const parsed = InvoiceSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Invalid invoice data',
    };
  }

  const { customerId, amount, status } = parsed.data;

  try {
    await query(
      `INSERT INTO invoices2 (customer_id, amount, status, date)
       VALUES ($1, $2, $3, CURRENT_DATE)`,
      [customerId, amount * 100, status]
    );
  } catch (error) {
    console.error('Create invoice error:', error);
    return {
      message: 'Failed to create invoice',
    };
  }

  revalidatePath('/dashboard/invoices');

  // ✅ IMPORTANT: return success message
  return {
    message: 'Invoice created successfully',
  };
}


export async function updateInvoice(
  id: string,
  _: InvoiceState,
  formData: FormData
) {
  await query(
    `UPDATE invoices2
     SET customer_id=$1, amount=$2, status=$3
     WHERE id=$4`,
    [
      formData.get('customerId'),
      Number(formData.get('amount')) * 100,
      formData.get('status'),
      id,
    ]
  );

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await query(`DELETE FROM invoices2 WHERE id=$1`, [id]);
  revalidatePath('/dashboard/invoices');
}

/* -------------------- CUSTOMERS -------------------- */

export async function createCustomer(
  _: CustomerState,
  formData: FormData
): Promise<CustomerState> {
  const parsed = CustomerSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    userEmail: formData.get('userEmail'),
  });

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Invalid form data',
    };
  }

  const { name, email, userEmail } = parsed.data;

  // ✅ Check if customer already exists
  const existingCustomer = await query(
    `SELECT * FROM customers2 WHERE email = $1 AND user_email = $2`,
    [email, userEmail]
  );

  if (existingCustomer.rowCount > 0) {
    return {
      message: 'Customer with this email already exists',
    };
  }

  try {
    await query(
      `INSERT INTO customers2 (name, email, image_url, user_email)
       VALUES ($1, $2, $3, $4)`,
      [
        name,
        email,
        '/customers/default-avatar.jpg',
        userEmail,
      ]
    );
  } catch (error: any) {
    console.error('Create customer error:', error);

    return {
      message: 'Database error while creating customer',
    };
  }

  return {
    message: 'Customer created successfully!',
  };
}




export async function updateCustomer(
  id: string,
  _: CustomerState,
  formData: FormData
) {
  await query(
    `UPDATE customers2
     SET name=$1, email=$2
     WHERE id=$3 AND user_email=$4`,
    [
      formData.get('name'),
      formData.get('email'),
      id,
      formData.get('userEmail'),
    ]
  );

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function deleteCustomer(id: string) {
  await query(`DELETE FROM customers2 WHERE id=$1`, [id]);
  revalidatePath('/dashboard/customers');
}

/* -------------------- AUTH -------------------- */

export async function createUserWithCredentials(
  _: UserState,
  formData: FormData
) {
  const parsed = UserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password } = parsed.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await query(
    `SELECT 1 FROM users2 WHERE email=$1`,
    [email]
  );

  if (existing.rowCount > 0) {
    return { message: 'Email already exists' };
  }

  await query(
    `INSERT INTO users2 (name, email, password, isoauth)
     VALUES ($1, $2, $3, false)`,
    [name, email, hashedPassword]
  );

  redirect('/login');
}

export async function authenticateWithCredentials(
  _: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return 'Invalid credentials';
    }
    throw error;
  }
}

export async function authenticateWithOAuth(provider: string) {
  await signIn(provider);
}

export async function updateUser(
  _: UserState,
  formData: FormData
): Promise<UserState> {
  try {
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    if (!password || password.length < 6) {
      return {
        message: 'Password must be at least 6 characters long',
        errors: {
          password: ['Password is too short'],
        },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await query(
      `UPDATE users2
       SET name = $1, password = $2, isoauth = false
       WHERE email = $3`,
      [
        name,
        hashedPassword,
        formData.get('userEmail'),
      ]
    );

    revalidatePath('/dashboard/user-profile');

    // ✅ SUCCESS
    return {
      message: 'User profile updated successfully',
    };
  } catch (error) {
    console.error('Update user error:', error);
    return {
      message: 'Failed to update user profile',
    };
  }
}


/* -------------------- Reset Password -------------------- */

export async function requestPasswordReset(
  _: any,
  formData: FormData
) {
  const email = formData.get('email') as string;

  const user = await query(
    `SELECT id FROM users2 WHERE email=$1`,
    [email]
  );

  // ❌ Email not found → explicit error
  if (user.rowCount === 0) {
    return {
      error: 'Email does not exist. Please create an account.',
    };
  }

  // ✅ Email exists → proceed
  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes

  await query(
    `UPDATE users2
     SET reset_token=$1, reset_token_expiry=$2
     WHERE email=$3`,
    [token, expiry, email]
  );

  const resetLink = `${process.env.BASE_URL}/reset-password?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: 'Reset your password',
    html: `
      <p>Click the link to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  });

  return {
    message: 'Password reset link sent to your email.',
  };
}



/* -------------------- upodated password after Reset  -------------------- */

export async function resetPassword(
  _: any,
  formData: FormData
) {
  const token = formData.get('token') as string;
  const password = formData.get('password') as string;

  const hashed = await bcrypt.hash(password, 10);

  const result = await query(
    `
    UPDATE users2
    SET password=$1,
        reset_token=NULL,
        reset_token_expiry=NULL
    WHERE reset_token=$2
      AND reset_token_expiry > NOW()
    `,
    [hashed, token]
  );

  if (result.rowCount === 0) {
    return { message: 'Invalid or expired token' };
  }

  return { message: 'Password updated successfully' };
}
