'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import useAuthStore from 'store/authStore';
import { loadStripe } from '@stripe/stripe-js';
import { checkout } from '../../stripe/stripe';

export default function Checkout({ priceId }: { priceId: string }) {
  const { user } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (user?.id) {
      setLoading(true);
      const data = JSON.parse(
        await checkout(
          user.email,
          priceId,
          location.origin + location.pathname,
        ),
      );
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);
      const res = await stripe?.redirectToCheckout({
        sessionId: data.id,
      });
      if (res?.error) {
        alert('Fail to checkout');
      }
      setLoading(false);
    } else {
      router.push('/auth?next=' + location.pathname);
    }
  };

  return (
    <button
      className="linear w-full rounded-xl bg-brand-400 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-300 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
      onClick={handleCheckout}
    >
      Getting Started{' '}
    </button>
  );
}
