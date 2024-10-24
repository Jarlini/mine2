import React, { useEffect, useState } from 'react';
import { getPackages } from './Packageapi';
import { useNavigate } from 'react-router-dom';
import '/home/uki-student/Downloads/mine/freshmyf-main/src/component/packegepage.css';

const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showAgreement, setShowAgreement] = useState(false); // State for agreement modal

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

  const handleCartToggle = (pkg) => {
    if (cart.some((item) => item._id === pkg._id)) {
      setCart(cart.filter((item) => item._id !== pkg._id));
    } else {
      setCart([...cart, pkg]);
    }

    const newTotal = cart.reduce((sum, item) => sum + item.price, 0) +
      (cart.some((item) => item._id === pkg._id) ? -pkg.price : pkg.price);
    setTotalAmount(newTotal);
  };

  const handleProceedToPayment = () => {
    setShowAgreement(true); // Show the agreement modal
  };

  const handleAccept = () => {
    // Navigate to the payment page when agreement is accepted
    navigate('/payment', { state: { cart, totalAmount } });
    setShowAgreement(false); // Close the agreement modal
  };

  return (
    <div className="packages-container">
      <h1>Select Packages</h1>
      {packages.map((pkg) => (
        <div key={pkg._id} className="package">
          <h2>{pkg.name}</h2>
          <p>{pkg.description}</p>
          <p>Price: Rs.{pkg.price}</p>

          {/* Display photo if available */}
          {pkg.photos && pkg.photos.length > 0 ? (
            pkg.photos.map((photo, index) => (
              <img 
                key={index} 
                src={`http://localhost:5000/${photo}`} // Ensure this matches your backend static file serving
                alt={pkg.name} 
                style={{ width: '200px', height: '150px', marginBottom: '10px' }} 
              />
            ))
          ) : (
            <p>No photo available</p>
          )}

          <button onClick={() => handleCartToggle(pkg)}>
            {cart.some((item) => item._id === pkg._id) ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="selected-packages">
          <h3>Selected Packages:</h3>
          <ul>
            {cart.map((pkg) => (
              <li key={pkg._id}>{pkg.name} - Rs.{pkg.price}</li>
            ))}
          </ul>
          <h3>Total Amount: Rs.{totalAmount.toLocaleString()}</h3>
          <button onClick={handleProceedToPayment}>
            Proceed to Payment
          </button>
        </div>
      )}

      {/* Agreement Modal */}
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
    </div>
  );
};

export default PackagesPage;
