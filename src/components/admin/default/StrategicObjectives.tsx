import Card from 'components/card';
import { getChartData, getRadarChartOptions } from 'variables/charts';
import RadarChart from 'components/charts/RadarChart';

const StrategicObjectives = () => {
  const chartData = getChartData([
    { name: 'PRODUCT A', data: [44, 55, 41, 67, 22, 43, 21] },
  ]);
  const chartOptions = getRadarChartOptions([
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
    <Card extra="!p-[20px] text-center">
      <div className="mt-[20px] flex flex-col ">
        <p className="text-2xl font-bold text-navy-700 dark:text-white">
          Strategic Objectives
        </p>
      </div>
      <div className="h-full w-full">
        <RadarChart chartOptions={chartOptions} chartData={chartData} />
      </div>
    </Card>
  );
};

export default StrategicObjectives;
