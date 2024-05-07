import Card from 'components/card';
import { getChartData, getLineChartOptions } from 'variables/charts';
import LineChart from 'components/charts/LineChart';

const ProjectedCarbonOffset = () => {
  const chartData = getChartData([
    { name: 'PRODUCT A', data: [44, 55, 41, 67, 22, 43, 21] },
  ]);
  const chartOptions = getLineChartOptions([
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ]);

  return (
    <Card extra="!p-[20px] h-fit text-center">
      <div className="mt-[20px] flex flex-col ">
        <p className="text-2xl font-bold text-navy-700 dark:text-white">
          Projected vs Actual Carbon Offset
        </p>
      </div>
      <div className="h-full w-full">
        <LineChart chartOptions={chartOptions} chartData={chartData} />
      </div>
    </Card>
  );
};

export default ProjectedCarbonOffset;
