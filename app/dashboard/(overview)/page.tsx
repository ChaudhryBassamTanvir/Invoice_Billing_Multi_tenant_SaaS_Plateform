import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next'; 
import darkTheme from '@/app/lib/dark-theme';

import { query } from '@/app/lib/db.server';
export const metadata: Metadata = {
  title: 'Dashboard',
};
import { auth } from '@/auth';
async function getUserName(email: string) {
  const result = await query(
    `SELECT name FROM users2 WHERE email = $1`,
    [email]
  );

  return result.rows[0]?.name ?? 'User';
}

export default async function Page() {
  
  // myUndefinedFunction(); // This will fail and Sentry will catch it
const session = await auth();

  if (!session?.user?.email) {
    return <p className="text-gray-400">Not authenticated</p>;
  }

  const userEmail = session.user.email;

  // 🔥 Fetch UPDATED name directly from DB
  const userName = await getUserName(userEmail);
   if (!session?.user?.email) {
    return <p className="text-gray-400">Not authenticated</p>;
  }


  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl ${darkTheme.title}`}>
       <span className='font-bold pr-3'> {userName}&apos;s</span> Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <CardWrapper userEmail={userEmail} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <RevenueChart />

          <LatestInvoices userEmail={userEmail} />
      </div>
    </main>
  );
}
function myUndefinedFunction() {
  throw new Error('Function not implemented.');
}

