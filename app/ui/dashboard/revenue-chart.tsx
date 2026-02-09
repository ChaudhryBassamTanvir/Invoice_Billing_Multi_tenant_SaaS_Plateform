import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { Revenue } from '@/app/lib/definitions';
import { fetchRevenue } from '@/app/lib/data';
import darkTheme from '@/app/lib/dark-theme';
import { auth } from '@/auth';

export default async function RevenueChart() {
  const session = await auth();
  const userEmail = session?.user?.email as string;

  const revenue: Revenue[] = await fetchRevenue(userEmail);

  const chartHeight = 350;

  // Always show last 12 months
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  // Default zero-revenue structure
  const defaultRevenue: Revenue[] = months.map((month) => ({
    month,
    revenue: 0,
  }));

  // Merge real revenue into default months
  const mergedRevenue: Revenue[] = defaultRevenue.map((item) => {
    const real = revenue?.find((r) => r.month === item.month);
    return real ? real : item;
  });

  const { yAxisLabels, topLabel } = generateYAxis(mergedRevenue);

  return (
    <div className="w-full md:col-span-4">
      <h2
        className={`${lusitana.className} mb-4 text-xl md:text-2xl ${darkTheme.title}`}
      >
        Recent Revenue
      </h2>

      <div className={`rounded-xl bg-gray-50 p-4 ${darkTheme.container}`}>
        <div className="grid grid-cols-[40px_1fr] gap-2 rounded-md bg-white p-4">
          
          {/* Y-axis */}
          <div className="flex flex-col justify-between text-xs text-gray-400">
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {/* Bars */}
          <div className="flex items-end gap-2 h-[380px] ml-2">
            {mergedRevenue.map((month) => (
              <div key={month.month} className="flex flex-col items-center gap-2">
                <div
                  className={`w-5 rounded-md transition-all duration-500 ${
                    month.revenue === 0 ? 'bg-gray-200' : 'bg-violet-400'
                  }`}
                  style={{
                    height: `${
                      month.revenue === 0
                        ? 4
                        : (chartHeight * month.revenue) / topLabel
                    }px`,
                  }}
                ></div>
                <p className="text-xs text-gray-400">{month.month}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-violet-600">
            Last 12 months
          </h3>
        </div>
      </div>
    </div>
  );
}
