import { query } from './db.server';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  CustomerForm,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;

/* =========================
   REVENUE
========================= */
export async function fetchRevenue() {
  noStore();
  try {
    const data = await query(`SELECT * FROM revenue`);
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

/* =========================
   LATEST INVOICES
========================= */
export async function fetchLatestInvoices(userEmail: string) {
  noStore();

  try {
    const data = await query(
      `
      SELECT
        invoices2.amount,
        customers2.name,
        customers2.email,
        invoices2.id
      FROM invoices2
      JOIN customers2 ON invoices2.customer_id = customers2.id
      WHERE customers2.user_email = $1
      ORDER BY invoices2.date DESC
      LIMIT 5
      `,
      [userEmail]
    );

    return data.rows.map((invoice: any) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),// convert your currency to Dollar
    }));
  } catch (error:any) {
    console.error('Database Error:', error.message);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

/* =========================
   DASHBOARD CARD DATA
========================= */
export async function fetchCardData(userEmail: string) {
  noStore();

  try {
    const invoiceCountPromise = query(
      `
      SELECT COUNT(*)
      FROM invoices2
      JOIN customers2 ON invoices2.customer_id = customers2.id
      WHERE customers2.user_email = $1
      `,
      [userEmail]
    );

    const customerCountPromise = query(
      `
      SELECT COUNT(*)
      FROM customers2
      WHERE user_email = $1
      `,
      [userEmail]
    );

    const invoiceStatusPromise = query(
      `
      SELECT
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS paid,
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS pending
      FROM invoices2
      JOIN customers2 ON invoices2.customer_id = customers2.id
      WHERE customers2.user_email = $1
      `,
      [userEmail]
    );

    const [invoiceCount, customerCount, invoiceStatus] =
      await Promise.all([
        invoiceCountPromise,
        customerCountPromise,
        invoiceStatusPromise,
      ]);

    return {
      numberOfInvoices: Number(invoiceCount.rows[0].count ?? 0),
      numberOfCustomers: Number(customerCount.rows[0].count ?? 0),
      totalPaidInvoices: formatCurrency(invoiceStatus.rows[0].paid ?? 0),
      totalPendingInvoices: formatCurrency(invoiceStatus.rows[0].pending ?? 0),
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

/* =========================
   FILTERED INVOICES
========================= */
export async function fetchFilteredInvoices(
  search: string,
  currentPage: number,
  userEmail: string
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const result = await query(
      `
      SELECT
        invoices2.id,
        invoices2.amount,
        invoices2.date,
        invoices2.status,
        customers2.name,
        customers2.email
      FROM invoices2
      JOIN customers2 ON invoices2.customer_id = customers2.id
      WHERE
        customers2.user_email = $1 AND
        (
          customers2.name ILIKE $2 OR
          customers2.email ILIKE $2 OR
          invoices2.amount::text ILIKE $2 OR
          invoices2.date::text ILIKE $2 OR
          invoices2.status ILIKE $2
        )
      ORDER BY invoices2.date DESC
      LIMIT $3 OFFSET $4
      `,
      [userEmail, `%${search}%`, ITEMS_PER_PAGE, offset]
    );

    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

/* =========================
   INVOICE PAGES
========================= */
export async function fetchInvoicesPages(search: string, userEmail: string) {
  noStore();

  try {
    const result = await query(
      `
      SELECT COUNT(*)
      FROM invoices2
      JOIN customers2 ON invoices2.customer_id = customers2.id
      WHERE
        customers2.user_email = $1 AND
        (
          customers2.name ILIKE $2 OR
          customers2.email ILIKE $2 OR
          invoices2.amount::text ILIKE $2 OR
          invoices2.date::text ILIKE $2 OR
          invoices2.status ILIKE $2
        )
      `,
      [userEmail, `%${search}%`]
    );

    return Math.ceil(
      Number(result.rows[0].count) / ITEMS_PER_PAGE
    );
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

/* =========================
   INVOICE BY ID
========================= */
export async function fetchInvoiceById(id: string, userEmail: string) {
  noStore();

  try {
    const data = await query(
      `
      SELECT
        invoices2.id,
        invoices2.customer_id,
        invoices2.amount,
        invoices2.status
      FROM invoices2
      JOIN customers2 ON invoices2.customer_id = customers2.id
      WHERE customers2.user_email = $1
        AND invoices2.id = $2
      `,
      [userEmail, id]
    );

    if (!data.rows.length) return false;

    return {
      ...data.rows[0],
      amount: data.rows[0].amount / 100,
    };
  } catch (error) {
    console.error('Database Error:', error);
    return false;
  }
}

/* =========================
   CUSTOMERS
========================= */
export async function fetchCustomers(userEmail: string) {
  noStore();

  try {
    const data = await query(
      `
      SELECT id, name
      FROM customers2
      WHERE user_email = $1
      ORDER BY name ASC
      `,
      [userEmail]
    );

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all customers.');
  }
}

/* =========================
   FILTERED CUSTOMERS
========================= */
export async function fetchFilteredCustomers(
  search: string,
  currentPage: number,
  userEmail: string
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await query(
      `
      SELECT
        customers2.id,
        customers2.name,
        customers2.email,
        COUNT(invoices2.id) AS total_invoices,
        SUM(CASE WHEN invoices2.status = 'pending' THEN invoices2.amount ELSE 0 END) AS total_pending,
        SUM(CASE WHEN invoices2.status = 'paid' THEN invoices2.amount ELSE 0 END) AS total_paid
      FROM customers2
      LEFT JOIN invoices2 ON customers2.id = invoices2.customer_id
      WHERE
        customers2.user_email = $1 AND
        (
          customers2.name ILIKE $2 OR
          customers2.email ILIKE $2
        )
      GROUP BY customers2.id, customers2.name, customers2.email
      ORDER BY customers2.name ASC
      LIMIT $3 OFFSET $4
      `,
      [userEmail, `%${search}%`, ITEMS_PER_PAGE, offset]
    );

    return data.rows.map((customer: any) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customer table.');
  }
}

/* =========================
   CUSTOMER PAGES
========================= */
export async function fetchCustomersPages(
  search: string,
  userEmail: string
) {
  noStore();

  try {
    const result = await query(
      `
      SELECT COUNT(*)
      FROM customers2
      WHERE
        user_email = $1 AND
        (
          name ILIKE $2 OR
          email ILIKE $2
        )
      `,
      [userEmail, `%${search}%`]
    );

    return Math.ceil(
      Number(result.rows[0].count) / ITEMS_PER_PAGE
    );
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of customers.');
  }
}

/* =========================
   CUSTOMER BY ID
========================= */
export async function fetchCustomerById(id: string, userEmail: string) {
  noStore();

  try {
    const customer = await query(
      `
      SELECT id, name, email
      FROM customers2
      WHERE user_email = $1 AND id = $2
      `,
      [userEmail, id]
    );

    return customer.rows[0] ?? false;
  } catch (error) {
    console.error('Database Error:', error);
    return false;
  }
}

/* =========================
   USER
========================= */
export async function getUser(userEmail: string) {
  noStore();

  try {
    const user = await query(
      `SELECT * FROM users2 WHERE email = $1`,
      [userEmail]
    );

    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
