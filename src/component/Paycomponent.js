import React, { useEffect, useState } from 'react';
import { getPackages } from './Packageapi';
import { useNavigate } from 'react-router-dom';
import './packegepage.css';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Alert, Form, Button } from 'react-bootstrap'; // Ensure you have Bootstrap installed

const PackagesPage = ({ isLoggedIn }) => {
  const [packages, setPackages] = useState([]);
  const [cart, setCart] = useState([]);
  const [showAgreement, setShowAgreement] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    passengers: [{ name: '', age: '', email: '' }],
    numberOfPassengers: 1,
    address: '',
    phone: '',
    paymentMethod: 'Total Payment',
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState({ success: null, message: '' });
  const [showPayPal, setShowPayPal] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages();
        setPackages(data);
      } catch (error) {
        alert('Failed to fetch packages. Please try again later.');
      }
    };
    fetchPackages();
  }, []);

  const calculateTotalAmount = () => {
    const total = cart.reduce((total, pkg) => total + pkg.price, 0) * bookingData.numberOfPassengers;
    setTotalAmount(total);
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [cart, bookingData.numberOfPassengers]);

  const handleCartToggle = (pkg) => {
    setCart((prev) => {
      const isInCart = prev.some((item) => item._id === pkg._id);
      return isInCart ? prev.filter((item) => item._id !== pkg._id) : [...prev, pkg];
    });
  };

  const handleAccept = () => {
    setShowAgreement(false);
    setShowBookingForm(true);
  };

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

  const handleProceedClick = () => {
    setShowPayPal(true); // Show PayPal button when proceeding to payment
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
        handleProceedClick(); // Proceed to PayPal payment function
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
    <div className="packages-container">
      {packages.map((pkg) => (
        <div key={pkg._id} className="package">
          <h2>{pkg.name}</h2>
          <p>{pkg.description}</p>
          <p>Price: Rs.{pkg.price}</p>
          <button onClick={() => handleCartToggle(pkg)}>
            {cart.some((item) => item._id === pkg._id) ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </div>
      ))}

      <div className="cart">
        <h2 style={{ color: 'white' }}>Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((pkg) => (
              <li key={pkg._id}>{pkg.name} - Rs.{pkg.price}</li>
            ))}
          </ul>
        )}
        <button onClick={() => setShowAgreement(true)} disabled={cart.length === 0}>
          Proceed to Checkout
        </button>
      </div>

      {showAgreement && (
        <div className="agreement-modal">
          <div className="agreement-content">
            <h2>Agreement</h2>
            <p>
              By joining these trips, you agree to the following conditions:
              <ul>
                <li>No use of drugs or alcohol during the travel.</li>
                <li>No disturbance to other passengers.</li>
                <li>We reserve the right to take action if any rules are violated.</li>
              </ul>
            </p>
            <h3>Total Amount: Rs.{totalAmount.toLocaleString()}</h3>
            <button className="accept-button" onClick={handleAccept}>
              Accept
            </button>
            <button className="cancel-button" onClick={() => setShowAgreement(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {showBookingForm && (
        <div className="booking-form">
          <h2>Booking Form</h2>
          <form onSubmit={handleBookingSubmit}>
            <label>
              Number of Passengers:
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
                  Passenger Name:
                  <input
                    type="text"
                    name={`passenger-name-${index}`}
                    value={passenger.name}
                    onChange={(e) => handleBookingFormChange(e, index)}
                    required
                  />
                </label>
                <label>
                  Passenger Age:
                  <input
                    type="number"
                    name={`passenger-age-${index}`}
                    value={passenger.age}
                    onChange={(e) => handleBookingFormChange(e, index)}
                    required
                  />
                </label>
                <label>
                  Passenger Email:
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
              Address:
              <input
                type="text"
                name="address"
                value={bookingData.address}
                onChange={handleBookingFormChange}
                required
              />
            </label>
            <label>
              Phone:
              <input
                type="tel"
                name="phone"
                value={bookingData.phone}
                onChange={handleBookingFormChange}
                required
              />
            </label>

            <button type="submit">Submit Booking</button> <br/> <br/>
          </form><br/> <br/>
        </div>
      )}

      {showPayPal && (
        <PayPalScriptProvider options={{ "client-id": "AVXQufnDMyJ42nUDkY_CqVvY_kp4YaMi0_t04V5d-9W4gp9mj_1S8_fi9fcpvZycoY3judqAKGCMgHSu" }}>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: totalAmount.toFixed(2), // Ensure the total amount is formatted correctly
                  },
                }],
              });
            }}
            onApprove={async (data, actions) => {
              const details = await actions.order.capture();
              setPaymentStatus({ success: true, message: 'Payment successful!' });
              console.log('Payment details:', details);
              alert('Transaction completed by ' + details.payer.name.given_name);
            }}
            onError={(err) => {
              console.error('PayPal Checkout onError:', err);
              setPaymentStatus({ success: false, message: 'Payment failed. Please try again.' });
            }}
          />
        </PayPalScriptProvider>
      )}

      {paymentStatus.success !== null && (
        <Alert variant={paymentStatus.success ? 'success' : 'danger'}>
          {paymentStatus.message}
        </Alert>
      )}
    </div>
  );
};

export default PackagesPage;
