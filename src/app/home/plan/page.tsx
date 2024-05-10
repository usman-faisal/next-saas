'use client';

import Price from 'components/subscription/Price';
import { useEffect } from 'react';
import {
  getCustomer,
  getProduct,
  getSubscription,
} from '../../../stripe/stripe';
import Card from 'components/card';

const Clients = () => {
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

          <button className="linear w-fit rounded-xl border-2 border-brand-400 px-10 py-2 mr-6 text-base font-medium text-brand-400 transition duration-200 dark:border-white dark:text-white">
            Basic
          </button>
        </div>
      </Card>
      <Price />
    </div>
  );
};

export default Clients;
