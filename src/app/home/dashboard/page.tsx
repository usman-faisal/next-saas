'use client';
import ProjectCarbonOffset from 'components/admin/default/ProjectCarbonOffset';
import MonthlyInitiatives from 'components/admin/default/MonthlyInitiatives';
import StrategicObjectives from 'components/admin/default/StrategicObjectives';
import OverallPerformance from 'components/admin/default/OverallPerformance';
import Card from 'components/card';

const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6"></div>

      <Card extra="h-fit p-8 ">
        <h3 className=" text-2xl font-semibold capitalize"> Hey User</h3>
      </Card>
    </div>
  );
};

export default Dashboard;
