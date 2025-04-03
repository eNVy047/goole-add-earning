'use client';

import { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const MIN_WITHDRAWAL_AMOUNT = 10; // Minimum $10 for withdrawal

export default function Wallet({ balance }: { balance: number }) {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  return (
    <div className="flex items-center space-x-4">
      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
        <span className="font-semibold">Balance: ${balance.toFixed(2)}</span>
      </div>
      
      {balance >= MIN_WITHDRAWAL_AMOUNT ? (
        <button
          onClick={() => setShowWithdrawModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Withdraw
        </button>
      ) : (
        <span className="text-gray-500">
          Min. ${MIN_WITHDRAWAL_AMOUNT} to withdraw
        </span>
      )}

      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Withdraw Funds</h3>
            <p className="mb-4">Withdraw ${balance.toFixed(2)} to your PayPal account</p>
            
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        value: balance.toFixed(2),
                        currency_code: "USD"
                      }
                    }
                  ]
                });
              }}
              onApprove={async (data, actions) => {
                const order = await actions.order?.capture();
                console.log("Order completed:", order);
                setShowWithdrawModal(false);
              }}
            />
            
            <button
              onClick={() => setShowWithdrawModal(false)}
              className="mt-4 text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 