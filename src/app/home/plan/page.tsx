'use client';

import Price from 'components/subscription/Price';
import Card from 'components/card';
import useAuthStore from 'store/authStore';

const Clients = () => {
  const authStore = useAuthStore();

  return (
    <div className=" mt-4">
      <Card extra=" p-6">
        <div className=" flex items-center justify-between ">
          <h3 className=" text-2xl font-semibold text-navy-700 dark:text-white">
            Current Plan
          </h3>

          <button className="linear mr-6 w-fit rounded-xl border-2 border-brand-400 px-10 py-2 text-base font-medium text-brand-400 transition duration-200 dark:border-white dark:text-white">
            {authStore?.userPlan || 'None'}
          </button>
        </div>
      </Card>
      <Price />
    </div>
  );
};

export default Clients;
