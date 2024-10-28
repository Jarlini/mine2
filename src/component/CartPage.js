import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Alert, Form, Button } from 'react-bootstrap';
import '/home/uki-student/mine/freshmyf-main/src/component/Payment.css';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart = [], totalAmount = 0 } = location.state || {}; // Get cart and totalAmount from location state
  const [showPayPal, setShowPayPal] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(true); // Show booking form by default
  const [bookingData, setBookingData] = useState({
    numberOfPassengers: 1,
    passengers: [{ name: '', age: '', email: '' }],
    address: '',
    phone: '',
  });
  const [paymentStatus, setPaymentStatus] = useState({ success: null, message: '' });

  const handleBookingFormChange = (e, index) => {
    const { name, value } = e.target;
    const passengers = [...bookingData.passengers];

    if (name.startsWith('passenger-')) {
      passengers[index][name.split('-')[1]] = value;
    } else {
      bookingData[name] = value; // Directly modify bookingData
    }
    setBookingData({ ...bookingData, passengers });
  };

  const handlePassengerCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    const passengers = Array.from({ length: count }, () => ({ name: '', age: '', email: '' }));
    setBookingData({ ...bookingData, numberOfPassengers: count, passengers });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const emailToCheck = bookingData.passengers[0].email;
    if (!emailToCheck) {
      alert('Please enter your email.');
      return;
    }

    // Check user email
    try {
      const response = await fetch(`/api/users/email/${emailToCheck}`);
      const user = await response.json();

      if (!response.ok || !user) {
        alert('This email is not associated with a logged-in account. Please sign up.');
        navigate('/auth/signup');
        return;
      }

      const bookingPayload = {
        ...bookingData,
        packages: cart.map((pkg) => ({
          packageId: pkg._id,
          packageName: pkg.name,
          packagePrice: pkg.price,
        })),
        totalAmount,
      };

      const bookingResponse = await fetch('http://localhost:3000/api/bookings/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });

      if (bookingResponse.ok) {
        alert('Booking successful! Proceeding to payment...');
        setShowBookingForm(false); // Hide booking form
        setShowPayPal(true); // Show PayPal button
      } else {
        const errorData = await bookingResponse.json();
        console.error('Booking error:', errorData);
        alert('Failed to create booking. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error occurred while submitting the booking. Please try again.');
    }
  };

  return (
    <div className="payment-page">
      <h2>Booking Summary</h2>
      <div className="cart-summary">
        <h2>Cart Summary</h2> <br/> <br/> <br/> <br/>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((pkg) => (
              <li key={pkg._id}>
                {pkg.name} - Rs.{pkg.price}
              </li>
            ))}
          </ul>
        )}
        <h3>Total: Rs.{totalAmount.toLocaleString()}</h3> <p className="animated-message">Thank you for choosing us! Your booking will help you create unforgettable memories.</p>

      </div>

      {showBookingForm && (
        <div className="booking-form">
          <h2>Booking Form</h2>
          <form onSubmit={handleBookingSubmit}>
            <label>
              Number of Passengers:<br/>
              <input
                type="number"
                min="1"
                name="numberOfPassengers"
                value={bookingData.numberOfPassengers}
                onChange={handlePassengerCountChange}
              />
            </label>

            {bookingData.passengers.map((passenger, index) => (
              <div key={index}>
                <label>
                  Passenger Name:<br/>
                  <input
                    type="text"
                    name={`passenger-name-${index}`}
                    value={passenger.name}
                    onChange={(e) => handleBookingFormChange(e, index)}
                    required
                  />
                </label>
                <label>
                  Passenger Age:<br/>
                  <input
                    type="number"
                    name={`passenger-age-${index}`}
                    value={passenger.age}
                    onChange={(e) => handleBookingFormChange(e, index)}
                    required
                  />
                </label>
                <label>
                  Passenger Email:<br/>
                  <input
                    type="email"
                    name={`passenger-email-${index}`}
                    value={passenger.email}
                    onChange={(e) => handleBookingFormChange(e, index)}
                    required
                  />
                </label>
              </div>
            ))}

            <label>
              Address:<br/>
              <input
                type="text"
                name="address"
                value={bookingData.address}
                onChange={handleBookingFormChange}
                required
              />
            </label>
            <label>
              Phone:<br/>
              <input
                type="tel"
                name="phone"
                value={bookingData.phone}
                onChange={handleBookingFormChange}
                required
              />
            </label>

            <Button type="submit" variant="primary" className="mt-3">
              Submit Booking
            </Button><br/><br/><br/>
          </form>
        </div>
      )}
      {showPayPal && (  <div className="paypal-container">
        <PayPalScriptProvider options={{ "client-id": "AVXQufnDMyJ42nUDkY_CqVvY_kp4YaMi0_t04V5d-9W4gp9mj_1S8_fi9fcpvZycoY3judqAKGCMgHSu" }}>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: totalAmount.toFixed(2),
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              const details = await actions.order.capture();
              setPaymentStatus({ success: true, message: 'Payment successful!' });
              alert('Transaction completed by ' + details.payer.name.given_name);
              navigate('/thankyou'); // Navigate to a thank-you page
            }}
            onError={(err) => {
              console.error('PayPal Checkout onError:', err);
              setPaymentStatus({ success: false, message: 'Payment failed. Please try again.' });
            }}
          />
        </PayPalScriptProvider>    </div>
      )}

      {paymentStatus.success !== null && (
        <Alert variant={paymentStatus.success ? 'success' : 'danger'}>
          {paymentStatus.message}
        </Alert>
      )}
    </div>
  );
};

export default PaymentPage;
