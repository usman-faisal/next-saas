'use client';
import ProjectCarbonOffset from 'components/admin/default/ProjectCarbonOffset';
import MonthlyInitiatives from 'components/admin/default/MonthlyInitiatives';
import StrategicObjectives from 'components/admin/default/StrategicObjectives';
import OverallPerformance from 'components/admin/default/OverallPerformance';

const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6"></div>

      {/* Charts */}

      {/* <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]"> */}
      <div className="mt-5 grid items-stretch gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <ProjectCarbonOffset />
        <MonthlyInitiatives />
        <StrategicObjectives />
        <OverallPerformance />
      </div>
    </div>
  );
};

export default Dashboard;
