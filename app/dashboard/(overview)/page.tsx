import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
// import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next'; 
import darkTheme from '@/app/lib/dark-theme';
// import { CardSkeleton } from '@/app/ui/skeletons';

export const metadata: Metadata = {
  title: 'Dashboard',
};
import { auth } from '@/auth';

export default async function Page() {
 const session = await auth();
  const userEmail = session?.user?.email!; 
  const userName = session?.user?.name; 
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
