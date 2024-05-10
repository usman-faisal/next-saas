'use client';

import Price from 'components/subscription/Price';
import { useEffect, useState } from 'react';
import {
  getCustomer,
  getProduct,
  getSubscription,
} from '../../../stripe/stripe';
import Card from 'components/card';
import useAuthStore from 'store/authStore';
import { usePathname, useRouter } from 'next/navigation';

const Clients = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [userPlan, setUserPlan] = useState(null);

  const getUserPlan = async () => {
    try {
      const plan = await useAuthStore.getUserPlan();
      setUserPlan(plan);
      if (
        !plan &&
        pathname !== '/home/plan' &&
        pathname !== '/home/dashboard'
      ) {
        router.push('/home/plan');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserPlan();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await getSubscription('sub_1PEXdiP37UrN6FWuRs3TeXxZ');
      const parsedRes = JSON.parse(res);
      console.log(parsedRes, 'parsedRes');
      const resProduct = await getProduct(parsedRes.plan.product as string);
      console.log(JSON.parse(resProduct));
      const resCustomer = await getCustomer(parsedRes.customer as string);
      console.log(JSON.parse(resCustomer), 'resCustomer');
    })();
  }, []);

  return (
    <div className=" mt-4">
      <Card extra=" p-6">
        <div className=" flex items-center justify-between ">
          <h3 className=" text-2xl font-semibold text-navy-700 dark:text-white">
            Current Plan
          </h3>

          <button className="linear mr-6 w-fit rounded-xl border-2 border-brand-400 px-10 py-2 text-base font-medium text-brand-400 transition duration-200 dark:border-white dark:text-white">
            {userPlan ? userPlan : 'None'}
          </button>
        </div>
      </Card>
      <Price />
    </div>
  );
};

export default Clients;
