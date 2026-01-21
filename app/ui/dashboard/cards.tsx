import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import darkTheme from '@/app/lib/dark-theme';
import { auth } from '@/auth';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper({userEmail,}: {userEmail: string;}) {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData(userEmail);

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card title="Total Customers" value={numberOfCustomers} type="customers" />
    </>
  );
}


export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
   <div
      className={`relative bg-white aspect-square rounded-2xl shadow hover:shadow-lg transition p-4 sm:p-6 overflow-hidden
        ${darkTheme.container}
      `}
    >
      {/* Top gradient bar */}
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
          type === 'collected'
            ? 'from-green-400 to-green-600'
            : type === 'pending'
            ? 'from-yellow-400 to-yellow-600'
            : type === 'customers'
            ? 'from-violet-400 to-violet-600'
            : 'from-indigo-400 to-indigo-600'
        }`}
      />

      <div className="flex items-center gap-2">
        {Icon ? (
          <Icon className={`h-4 w-4 text-gray-400 ${darkTheme.text}`} />
        ) : null}
        <h3 className={`text-xs sm:text-sm font-medium text-gray-500 ${darkTheme.title}`}>
          {title}
        </h3>
      </div>

      <p
        className={`${lusitana.className} mt-3 sm:mt-4 text-2xl sm:text-xl font-bold text-gray-800
          ${darkTheme.title}
        `}
      >
        {value}
      </p>

      <p className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-[10px] sm:text-xs text-gray-400">
        {type === 'collected'
          ? 'Updated today'
          : type === 'pending'
          ? 'Awaiting payment'
          : type === 'customers'
          ? 'Active users'
          : 'Total issued'}
      </p>
    </div>
  );
}
