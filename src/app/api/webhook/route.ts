import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Verify the webhook signature (you'll need to implement this)
    // const isValid = verifyPayPalWebhook(body);
    // if (!isValid) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    // }

    // Handle different webhook events
    switch (body.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        // Update user's balance in your database
        // await updateUserBalance(body.resource.payer.email_address, -body.resource.amount.value);
        break;
      default:
        console.log('Unhandled event type:', body.event_type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
} 