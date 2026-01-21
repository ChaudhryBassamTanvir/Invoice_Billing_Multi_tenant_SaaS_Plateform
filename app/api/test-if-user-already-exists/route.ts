import { auth } from '@/auth';
import { query } from '@/app/lib/db.server';

type AccountUser = {
  name: string;
  email: string;
};

const BASE_URL = process.env.BASE_URL;

export const runtime = 'nodejs';

export async function GET() {
  const session = await auth();

  if (!session || !session.user?.email) {
    return Response.redirect(`${BASE_URL}/login`);
  }

  const { name, email } = session.user as AccountUser;

  // Check if user exists in LOCAL DB
  const user = await query(
    'SELECT id FROM users2 WHERE email = $1',
    [email]
  );

  if (user.rowCount === 0) {
    try {
      await query(
        `INSERT INTO users2 (name, email, isoauth)
         VALUES ($1, $2, $3)`,
        [name, email, true]
      );
    } catch (error) {
      console.error('OAuth user insert failed:', error);
    }
  }

  return Response.redirect(`${BASE_URL}/dashboard`);
}
