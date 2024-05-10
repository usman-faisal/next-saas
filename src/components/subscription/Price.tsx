'use client';
import React from 'react';
import useAuthStore from 'store/authStore';
import Checkout from './Checkout';
import Card from 'components/card';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

export default function Price() {
  const prices = [
    {
      title: 'Basic',
      description: 'Start your next side project',
      benefits: [
        'Improved productivity',
        'Enhanced performance',
        'Cost savings',
        'Improved communication',
        'Enhanced collaboration',
      ],
      amount: 10,
      priceId: 'price_1PESnOP37UrN6FWu1H45oYTw',
    },
    {
      title: 'Premium',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      benefits: [
        'Improved productivity',
        'Enhanced performance',
        'Cost savings',
        'Improved communication',
        'Enhanced collaboration',
      ],
      amount: 20,
      priceId: 'price_1PESoGP37UrN6FWuPuszjB3s',
    },
    {
      title: 'Enterpise',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      benefits: [
        'Improved productivity',
        'Enhanced performance',
        'Cost savings',
        'Improved communication',
        'Enhanced collaboration',
      ],
      amount: 100,
      priceId: 'price_1PESojP37UrN6FWucSJBIc1V',
    },
  ];

  return (
    <div>
      <div className=" mt-4 grid grid-cols-1 gap-5 md:grid-cols-3">
        {prices.map((price, index) => {
          const isPopular = index === 1;

          return (
            <Card extra="flex-col justify-between gap-4 p-8" key={index}>
              <div className=" flex flex-col items-center justify-center space-y-3">
                <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
                  {price.title}
                </h1>
                <h1 className="text-6xl font-bold text-navy-700 dark:text-white">
                  {price.amount}$
                </h1>
                <p className=" px-6 text-center text-sm text-gray-400 ">
                  {price.description}
                </p>
              </div>
              <div className=" mx-auto my-4 flex w-fit flex-col space-y-3">
                {price.benefits.map((benefit, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-wrap items-center gap-2"
                    >
                      <IoMdCheckmarkCircleOutline className=" text-xl text-navy-700 dark:text-white" />
                      <h1 className="text-sm text-navy-700 dark:text-gray-400">{benefit}</h1>
                    </div>
                  );
                })}
              </div>
              <Checkout priceId={price.priceId} />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
