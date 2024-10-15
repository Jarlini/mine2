import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { Alert, Form, Button } from 'react-bootstrap'; // Ensure Form and Button are imported

const ConfirmPayment = () => {
  const [serviceName, setServiceName] = useState('');
  const [serviceAmountPerHour, setServiceAmountPerHour] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState({ success: null, message: '' });
  const [email, setEmail] = useState('');
  const [showPayPal, setShowPayPal] = useState(false); // State to control PayPal button visibility
  const [error, setError] = useState(''); // State to store error messages

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const name = query.get('name');
  const amount = query.get('amount');

  // Set service details from query params
  useEffect(() => {
    if (name && amount) {
      setServiceName(name);
      const parsedAmount = parseFloat(amount);
      setServiceAmountPerHour(parsedAmount);
      setTotalAmount(parsedAmount);
    }
  }, [name, amount]);

  const isLoggedIn = !!localStorage.getItem('token');

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(`/login?redirect=/confirm-payment?name=${name}&amount=${amount}`);
    }
  }, [isLoggedIn, navigate, name, amount]);

  // Handle successful form submission
  const handleFormSubmit = async (paymentId) => {
    const bookingData = {
      planName: serviceName,
      email,
      totalAmount: totalAmount.toFixed(2),
      paymentId, // Include paymentId in the booking data
    };

    console.log("Booking data being sent:", bookingData); // Debugging output

    try {
      const response = await axios.post('http://localhost:5000/api/bookingservice', bookingData);
      setPaymentStatus({ success: true, message: response.data.message });
    } catch (error) {
      console.error("Payment submission error:", error.response ? error.response.data : error.message);
      setPaymentStatus({ success: false, message: 'Error processing payment. Please try again.' });
    }
  };

  const handleProceedClick = () => {
    // Check if email is empty
    if (!email.trim()) {
      setError('Please enter a valid email.'); // Show error message
      setShowPayPal(false); // Ensure PayPal button is hidden
    } else {
      setError(''); // Clear error message
      setShowPayPal(true); // Show PayPal button
    }
  };

  return (
    <div className="login-form">
      <h2 className="text-center mb-4">Confirm Payment</h2>

      {paymentStatus.message && (
        <Alert variant={paymentStatus.success ? 'success' : 'danger'}>
          {paymentStatus.message}
        </Alert>
      )}

      {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}

      <p><strong>Service:</strong> {serviceName || 'Loading...'}</p>
      <p><strong>Amount:</strong> ${totalAmount.toFixed(2)}</p>

      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="input-icon"
            disabled={showPayPal} // Disable if PayPal button is shown
          />
        </Form.Group>

        {/* Proceed Button */}
        {!showPayPal && (
          <Button variant="primary" className="mt-3 cs-button" onClick={handleProceedClick}>
            Proceed to Payment
          </Button>
        )}

        {/* PayPal Payment Button */}
        {showPayPal && (
          <>
            <h3>Payment Information</h3>
            <PayPalScriptProvider options={{ "client-id": "AT4si2YLorhpc5Nk-YiaE8za2qLz2Jo9cSp3AgoJnFZAXpum0idHZOu35dqP5bj0S9nB6qHP0h7Lk9k_" }}>
              <PayPalButtons
                style={{ layout: "vertical" }}
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
                  const order = await actions.order.capture();
                  handleFormSubmit(order.id); // Pass the payment ID to handleFormSubmit
                }}
                onError={() => {
                  setPaymentStatus({ success: false, message: 'Payment failed. Please try again.' });
                }}
              />
            </PayPalScriptProvider>
          </>
        )}
      </Form>
    </div>
  );
};

export default ConfirmPayment;
