import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { Revenue } from '@/app/lib/definitions';
import { fetchRevenue } from '@/app/lib/data';
import darkTheme from '@/app/lib/dark-theme';
import { auth } from '@/auth';
// import { generateYAxis } from '@/app/lib/data';
// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart() {
  // const revenue: Revenue[] = await fetchRevenue();
  const session = await auth();
  const userEmail = session?.user?.email as string;
  console.log("The email is ",userEmail);
  
  const revenue = await fetchRevenue(userEmail);

  const chartHeight = 350;
  // NOTE: comment in this code when you get to this point in the course

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  
  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl
        ${darkTheme.title}
      `}>
        Recent Revenue
      </h2>
      {/* NOTE: comment in this code when you get to this point in the course */}
<div className={`rounded-xl bg-gray-50 p-4 ${darkTheme.container}`}>
  <div className="grid grid-cols-[40px_1fr] gap-2 rounded-md bg-white p-4">
    {/* Left column: Y-axis labels */}
    <div className="flex flex-col justify-between text-xs text-gray-400">
      {yAxisLabels.map((label) => (
        <p key={label}>{label}</p>
      ))}
    </div>

    {/* Right column: Bars */}
    <div className="flex items-end gap-2 h-[380px] ml-2">
      {revenue.map((month: any) => (
        <div key={month.month} className="flex flex-col items-center gap-2">
          <div
            className="w-5 rounded-md bg-violet-400 transition-all duration-500"
            style={{
              height: `${(350 * month.revenue) / topLabel}px`,
            }}
          ></div>
          <p className="text-xs text-gray-400">{month.month}</p>
        </div>
      ))}
    </div>
  </div>

  <div className="flex items-center pb-2 pt-6">
    <CalendarIcon className="h-5 w-5 text-gray-500" />
    <h3 className="ml-2 text-sm text-violet-600">Last 12 months</h3>
  </div>
</div>

    </div>
  );
}
