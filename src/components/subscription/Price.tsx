'use client';
import React from 'react';
import useAuthStore from 'store/authStore';
import Checkout from './Checkout';

export default function Price() {
  const prices = [
    {
      title: 'Hobby',
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
      title: 'Pro',
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
      <div className=" grid grid-cols-1 gap-5 md:grid-cols-3">
        {prices.map((price, index) => {
          const isPopular = index === 1;

          return (
            <div key={index}>
              <div className="space-y-3">
                <h1 className="text-2xl font-bold">{price.title}</h1>
                <h1 className="text-3xl font-bold">{price.amount}$</h1>
                <p className="text-sm text-gray-400">{price.description}</p>
              </div>
              <div className="space-y-3">
                {price.benefits.map((benefit, index) => {
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <h1 className="text-sm text-gray-400">{benefit}</h1>
                    </div>
                  );
                })}
              </div>
              <Checkout priceId={price.priceId} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
