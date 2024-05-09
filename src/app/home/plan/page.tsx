'use client';

import Price from 'components/subscription/Price';
import { useEffect } from 'react';
import {
  getCustomer,
  getProduct,
  getSubscription,
} from '../../../stripe/stripe';

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
    <div>
      <Price />
    </div>
  );
};

export default Clients;
