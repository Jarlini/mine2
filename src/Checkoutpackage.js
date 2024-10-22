import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
// import { Alert } from 'react-bootstrap';

const CheckoutPage = ({ cart }) => {
  const [bookingData, setBookingData] = useState({
    passengers: [{ name: '', age: '', email: '' }],
    address: '',
    phone: '',
  });
  const [totalAmount, setTotalAmount] = useState(cart.reduce((total, pkg) => total + pkg.price, 0));
  const [paymentStatus, setPaymentStatus] = useState({ success: null, message: '' });

  const handleBookingFormChange = (e, index) => {
    const { name, value } = e.target;
    const passengers = [...bookingData.passengers];
    passengers[index][name] = value;
    setBookingData({ ...bookingData, passengers });
  };

  const handleProceedToPayment = () => {
    // Handle booking submission and validation logic here
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <h2>Total Amount: Rs.{totalAmount.toLocaleString()}</h2>

      <form onSubmit={handleProceedToPayment}>
        {bookingData.passengers.map((passenger, index) => (
          <div key={index}>
            <label>
              Passenger Name:
              <input
                type="text"
                name="name"
                value={passenger.name}
                onChange={(e) => handleBookingFormChange(e, index)}
                required
              />
            </label>
            <label>
              Passenger Age:
              <input
                type="number"
                name="age"
                value={passenger.age}
                onChange={(e) => handleBookingFormChange(e, index)}
                required
              />
            </label>
            <label>
              Passenger Email:
              <input
                type="email"
                name="email"
                value={passenger.email}
                onChange={(e) => handleBookingFormChange(e, index)}
                required
              />
            </label>
          </div>
        ))}
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={bookingData.address}
            onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={bookingData.phone}
            onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
            required
          />
        </label>
        <button type="submit">Submit Booking</button>
      </form>

      {paymentStatus.success !== null && (
        <Alert variant={paymentStatus.success ? 'success' : 'danger'}>
          {paymentStatus.message}
        </Alert>
      )}

      <PayPalScriptProvider options={{ "client-id": "YOUR_CLIENT_ID" }}>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: totalAmount.toFixed(2),
                },
              }],
            });
          }}
          onApprove={async (data, actions) => {
            const details = await actions.order.capture();
            setPaymentStatus({ success: true, message: 'Payment successful!' });
            console.log('Payment details:', details);
          }}
          onError={(err) => {
            console.error('PayPal Checkout onError:', err);
            setPaymentStatus({ success: false, message: 'Payment failed. Please try again.' });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default CheckoutPage;
