import Card from 'components/card';
import BarChart from 'components/charts/BarChart';
import { getBarChartOptions, getChartData } from 'variables/charts';

const MonthlyInitiatives = () => {
  const barChartData = getChartData([
    { name: 'PRODUCT A', data: [44, 55, 41, 67, 22, 43, 21] },
  ]);
  const barChartOptions = getBarChartOptions([
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
  ]);
  return (
    <Card extra="!p-[20px] h-fit text-center">
      <div className="mt-[20px] px-6 text-center">
        <h2 className="text-center text-2xl font-bold text-navy-700 dark:text-white">
          Initiative by Month
        </h2>
      </div>

      <div className="md:mt-16 lg:mt-0">
        <div className="h-full">
          <BarChart chartData={barChartData} chartOptions={barChartOptions} />
        </div>
      </div>
    </Card>
  );
};

export default MonthlyInitiatives;
