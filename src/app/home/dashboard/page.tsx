'use client';
import ProjectCarbonOffset from 'components/admin/default/ProjectCarbonOffset';
import MonthlyInitiatives from 'components/admin/default/MonthlyInitiatives';
import StrategicObjectives from 'components/admin/default/StrategicObjectives';
import OverallPerformance from 'components/admin/default/OverallPerformance';
import Card from 'components/card';
import { getUser } from 'utils/auth';
import useAuthStore from 'store/authStore';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const authStore = useAuthStore();
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const user = await authStore.getUserProfile();
        console.log(user);
        setUser(user);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <div className=" mt-4">
      <Card extra="h-fit p-6 ">
        <h3 className=" text-2xl font-semibold capitalize text-navy-700 dark:text-white">
          {' '}
          Hey {user?.name || 'User'}
        </h3>
      </Card>
    </div>
  );
};

export default Dashboard;
