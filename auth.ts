import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import type { User } from '@/app/lib/definitions';
import { query } from '@/app/lib/db.server';

export const runtime = 'nodejs';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const res = await query(
      'SELECT * FROM users2 WHERE email = $1',
      [email]
    );

    if (res.rowCount === 0) return undefined;

    const user = res.rows[0];

    if (user.isoauth === true) {
      throw new Error(
        'User tried to login using OAuth without setting a password'
      );
    }

    return user;
  } catch (error:any) {
    console.error(error.message);
    throw new Error('Failed to fetch user.');
  }
}
//handlers are GET & POST
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const user = await getUser(email);
        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(
          password,
          user.password
        );

        if (!passwordsMatch) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
});
