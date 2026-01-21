import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';
import darkTheme from '@/app/lib/dark-theme';

export default async function LatestInvoices({
  userEmail,
}: {
  userEmail: string;
}) {
  const latestInvoices = await fetchLatestInvoices(userEmail);

  if (!latestInvoices || latestInvoices.length === 0) {
    return (
      <div className="md:col-span-4">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl ${darkTheme.title}`}>
          Latest Invoices
        </h2>
        <p className="text-gray-400">No invoices found.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl ${darkTheme.title}`}>
        Latest Invoices
      </h2>

      <div className={`flex grow flex-col justify-between rounded-xl
        bg-gray-50 ${darkTheme.container} p-4
      `}>
        <div className={`bg-white ${darkTheme.bg} px-6`}>
          {latestInvoices.map((invoice:any, i:any) => (
            <div
              key={invoice.id}
              className={clsx(
                `flex items-center justify-between py-4 ${darkTheme.border}`,
                { 'border-t': i !== 0 }
              )}
            >
              <div className="min-w-0">
                <p className={`truncate text-sm font-semibold md:text-base ${darkTheme.title}`}>
                  {invoice.name}
                </p>
                <p className="hidden text-sm text-gray-500 sm:block">
                  {invoice.email}
                </p>
              </div>

              <p className={`${lusitana.className} truncate text-sm font-medium md:text-base ${darkTheme.title}`}>
                {invoice.amount}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
