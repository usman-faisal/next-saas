'use server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SK!);

export async function getPlan(planId: string) {
  return JSON.stringify(await stripe.plans.retrieve(planId));
}

export async function checkout(
  email: string,
  priceId: string,
  redirectTo: string,
) {
  return JSON.stringify(
    await stripe.checkout.sessions.create({
      success_url: redirectTo || process.env.SITE_URL,
      cancel_url: process.env.SITE_URL,
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
    }),
  );
}
export async function manageBilling(customer_id: string) {
  return JSON.stringify(
    await stripe.billingPortal.sessions.create({
      customer: customer_id,
      return_url: process.env.SITE_URL,
    }),
  );
}

export async function getSubscription(subscriptionId: string) {
  return JSON.stringify(await stripe.subscriptions.retrieve(subscriptionId));
}

export async function getProduct(productId: string) {
  return JSON.stringify(await stripe.products.retrieve(productId));
}

export async function getCustomer(customerId: string) {
  return JSON.stringify(await stripe.customers.retrieve(customerId));
}
