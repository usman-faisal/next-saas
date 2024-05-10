'use client';
import Card from 'components/card';
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
