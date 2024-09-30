import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const PaymentComponent = ({ packageId, totalAmount }) => {
  const handleApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      alert(`Transaction completed by ${details.payer.name.given_name}`);
      // Call your backend to save the transaction details
      // Example: await saveTransaction({ packageId, transactionId: details.id });
    });
  };

  return (
    <PayPalScriptProvider
      options={{ 
        "client-id": "GGGHLKYFJKWTQ", // Your PayPal client ID
        currency: "LKR", // Use LKR for Sri Lankan Rupees
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: totalAmount.toString(), // Total amount as string
                currency_code: 'LKR', // Currency code
              },
              description: `Payment for packages: ${packageId}`, // Order description
            }],
          });
        }}
        onApprove={handleApprove}
        onError={(err) => {
          console.error('PayPal Checkout onError', err);
          alert('An error occurred during the transaction. Please try again.');
        }}
        onCancel={() => {
          alert('Transaction cancelled by the user.');
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaymentComponent;
