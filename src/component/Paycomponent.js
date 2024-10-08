import React, { useEffect, useState } from 'react';
import { getPackages } from './Packageapi';
import { useNavigate } from 'react-router-dom';
import './packegepage.css';

const PackagesPage = ({ isLoggedIn }) => {
  const [packages, setPackages] = useState([]);
  const [cart, setCart] = useState([]);
  const [showAgreement, setShowAgreement] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    passengers: [{ name: '', age: '', email: '' }],
    numberOfPassengers: 1,
    address: '',
    phone: '',
    paymentMethod: 'Total Payment',
  });

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

  const totalAmount = cart.reduce((total, pkg) => total + pkg.price, 0) * bookingData.numberOfPassengers;

  const handleCartToggle = (pkg) => {
    setCart((prev) => {
      const isInCart = prev.some((item) => item._id === pkg._id);
      return isInCart ? prev.filter((item) => item._id !== pkg._id) : [...prev, pkg];
    });
  };

  const handleAccept = () => {
    setShowAgreement(false);
    setShowEmailForm(true);
  };

  const handleEmailSubmit = async () => {
    if (!email) {
      alert('Please enter your email.');
      return;
    }

    try {
      const response = await fetch(`/api/users/email/${email}`);
      const user = await response.json();

      if (response.ok && user) {
        setShowBookingForm(true);
      } else {
        alert('This email is not associated with a logged-in account. Please sign up.');
        navigate('/auth/signup');
      }
    } catch (error) {
      alert('Error occurred while checking email. Please try again.');
      console.error('Error checking email:', error);
    }
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

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
  
    const bookingPayload = {
      ...bookingData,
      packages: cart.map((pkg) => ({
        packageId: pkg._id,
        packageName: pkg.name,
        packagePrice: pkg.price,
      })),
      totalAmount,
    };
  
    try {
      // First, save the booking to the backend
      const response = await fetch('http://localhost:3000/api/bookings/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });
  
      if (response.ok) {
        alert('Booking successful! Proceeding to payment...');
        
        // Trigger PayHere payment
        handlePayment(); // Call the PayHere payment function
      } else {
        const errorData = await response.json();
        console.error('Booking error:', errorData);
        alert('Failed to create booking. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error occurred while submitting the booking. Please try again.');
    }
  };

  // PayHere payment logic
  const handlePayment = () => {
    if (typeof payhere !== 'undefined') {
      const orderId = `ORDER_${Date.now()}`;
      const payment = {
        sandbox: true,
        merchant_id: '1228351',
        return_url: 'http://localhost:3000/payment/success',
        cancel_url: 'http://localhost:3000/payment/cancel',
        notify_url: 'http://localhost:5000/payment/notify',
        order_id: orderId,
        items: cart.map((pkg) => pkg.name).join(', '),
        amount: totalAmount,
        currency: 'LKR',
        first_name: bookingData.passengers[0].name,
        last_name: '',
        email: bookingData.passengers[0].email,
        phone: bookingData.phone,
        address: bookingData.address,
        city: 'Colombo',
        country: 'Sri Lanka',
        merchant_secret: 'MjQ0NDQwNDE0OTExOTY1NjAyOTkzMTYzNDA4NTEzMjkzODA0OTcxMg==',
      };
  
      // Start the payment process
      payhere.startPayment(payment);
    } else {
      console.error('PayHere is not defined');
      alert('Payment system is not available. Please try again later.');
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
      <h2 style={{ color: 'black' }}>Cart</h2>
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

      {showEmailForm && (
        <div className="email-form">
          <h2 style={{ color: '#D5006D' }}>Enter your Email</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button onClick={handleEmailSubmit}>Submit</button>
        </div>
      )}

      {showBookingForm && (
        <div className="booking-form">
        <h2 style={{ color: 'black' }}>Booking Form</h2>

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

            <button type="submit">Submit Booking</button> <br/> <br/> <br/>
          </form>
        </div>
      )}    <div id="payhere-form" data-pay-id="o38e69c82" data-type="SANDBOX"></div>
      <script src="https://sandbox.payhere.lk/payhere.pay.button.js" id="payhere-button"></script>
    </div>
 
  );
};

export default PackagesPage;
