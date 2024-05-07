import Card from 'components/card';
import {
  getChartData,
  getLineChartOptions,
  getRadialBarChartOptions,
} from 'variables/charts';
import LineChart from 'components/charts/LineChart';
import RadialBarChart from 'components/charts/RadialBarChart';

const OverallPerformance = () => {
  const chartData = getChartData([
    { name: 'PRODUCT A', data: [44, 55, 41, 67, 22, 43, 21] },
  ]);
  const chartOptions = getRadialBarChartOptions();

  return (
    <Card extra="!p-[20px] text-center  ">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="h-auto w-full">
          <RadialBarChart chartOptions={chartOptions} chartData={[40]} />
        </div>
        <div className="mt-[20px] flex flex-col ">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            Overall Performance
          </p>
        </div>
      </div>
    </Card>
  );
};

export default OverallPerformance;
