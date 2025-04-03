import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { PayPalButtons } from '@paypal/react-paypal-js';
import Header from '@/components/Header';

export default function WithdrawPage() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <main>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Withdraw Earnings</h1>
          <p className="text-gray-600 mb-6">
            Withdraw your earnings to your PayPal account. Minimum withdrawal amount is $10.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Current Balance</h2>
              <p className="text-3xl font-bold text-green-600">$0.00</p>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4">Withdraw to PayPal</h2>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: "10.00", // This should be dynamic based on user's balance
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  if (actions.order) {
                    const order = await actions.order.capture();
                    // Handle successful withdrawal
                    console.log("Withdrawal successful", order);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 