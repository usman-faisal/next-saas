import Stripe from 'stripe';
import { headers } from 'next/headers';
import { buffer } from 'micro';
import supabaseAdmin from '../../../../supabase/supabaseAdmin';
import { NextRequest, NextResponse as Response } from 'next/server';

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET!;

const stripe = new Stripe(process.env.STRIPE_SK!);

export async function POST(req: any) {
  const rawBody = await req.json();
  try {
    const sig = headers().get('stripe-signature');
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        JSON.stringify(rawBody),
        sig!,
        endpointSecret,
      );
    } catch (err: any) {
      return Response.json(
        { error: `Webhook Error ${err?.message!} ` },
        { status: 500 },
      );
    }

    switch (event.type) {
      case 'invoice.payment_succeeded':
        const result = event.data.object;
        const end_at = new Date(
          result.lines.data[0].period.end * 1000,
        ).toISOString();
        const customer_id = result.customer as string;
        const subscription_id = result.subscription as string;
        const email = result.customer_email as string;
        const error = await onPaymentSucceed(
          end_at,
          customer_id,
          subscription_id,
          email,
        );
        if (error) {
          console.log(error);
          return Response.json({ error: error.message });
        }
        break;
      case 'customer.subscription.deleted':
        const deleteSubscription = event.data.object;
        const cancelError = await onSubCancel(deleteSubscription.id);
        if (cancelError) {
          console.log(cancelError);
          return Response.json({ error: cancelError.message });
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return Response.json({});
  } catch (e) {
    return Response.json({ error: `Webhook Error}` });
  }
}

async function onPaymentSucceed(
  end_at: string,
  customer_id: string,
  subscription_id: string,
  email: string,
) {
  const supabase = await supabaseAdmin();
  console.log(supabase, 'supabase');
  const { error } = await supabase
    .from('subscriptions')
    .update({
      end_at,
      customer_id,
      subscription_id,
    })
    .eq('email', email);
  console.log(error, 'supabase error');
  return error;
}

async function onSubCancel(subscription_id: string) {
  const supabase = await supabaseAdmin();
  const { error } = await supabase
    .from('subscriptions')
    .update({
      customer_id: null,
      subscription_id: null,
    })
    .eq('subscription_id', subscription_id);
  return error;
}
