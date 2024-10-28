import React, { useEffect, useState } from 'react';
import { getPackages } from './Packageapi';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faDollarSign, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showAgreement, setShowAgreement] = useState(false);
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
    const isAlreadyInCart = cart.some((item) => item._id === pkg._id);

    if (isAlreadyInCart) {
      const updatedCart = cart.filter((item) => item._id !== pkg._id);
      setCart(updatedCart);
      setTotalAmount(totalAmount - pkg.price);
    } else {
      setCart([...cart, pkg]);
      setTotalAmount(totalAmount + pkg.price);
    }
  };

  const handleProceedToPayment = () => {
    setShowAgreement(true);
  };

  const handleAccept = () => {
    navigate('/payment', { state: { cart, totalAmount } });
    setShowAgreement(false);
  };
  
  return (
    <div className="container py-5"><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
 
      <h1 className="text-center mb-5 text-primary">
        <FontAwesomeIcon icon={faHeart} className="me-2" />       Select Your Dream Packages
      </h1>
      
      <div className="row">
        <div className="col-md-8">
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {packages.map((pkg) => (
              <div key={pkg._id} className="col">
                <div className="card h-100 shadow-sm border-primary">
                  {pkg.photos && pkg.photos.length > 0 ? (
                    <img 
                      src={`http://localhost:5000/${pkg.photos[0]}`} 
                      alt={pkg.name} 
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                      <p className="text-muted">No photo available</p>
                    </div>
                  )}
                  <div className="card-body text-warning">
                    <h5 className="card-title">{pkg.name}</h5>
                    <p className="card-text">{pkg.description}</p>
                    <p className="card-text text-primary">
                      <FontAwesomeIcon icon={faDollarSign} /> Price: Rs.{pkg.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="card-footer bg-transparent border-top-0">
                    <button 
                      className={`btn btn-${cart.some((item) => item._id === pkg._id) ? 'danger' : 'warning'} w-80`}
                      onClick={() => handleCartToggle(pkg)}
                      style={{ backgroundColor: '#FFA500', borderColor: '#FFA500' }}
                    >
                      <FontAwesomeIcon icon={cart.some((item) => item._id === pkg._id) ? faTimesCircle : faShoppingCart} className="me-2" />
                      {cart.some((item) => item._id === pkg._id) ? 'Remove from Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <br/><br/><br/><br/><br/>
        <div className="col-md-4">
          <div className="card border-primary mb-4">
            <div className="card-header bg-white text-primary">
              <h3 className="mb-0">
                <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                Your Cart
              </h3>
            </div>
            <div className="card-body">
              {cart.length > 0 ? (
                <>
                  <ul className="list-group list-group-flush mb-3">
                    {cart.map((pkg) => (
                      <li key={pkg._id} className="list-group-item d-flex justify-content-between align-items-center">
                        {pkg.name}
                        <span className="badge bg-primary rounded-pill">Rs.{pkg.price.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="mb-0">Total Amount:</h4>
                    <h4 className="mb-0 text-primary">Rs.{totalAmount.toLocaleString()}</h4>
                  </div>
                  <button 
                    className="btn btn-warning w-100" 
                    onClick={handleProceedToPayment}
                    style={{ backgroundColor: '#FFA500', borderColor: '#FFA500' }}
                  >
                    <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                    Proceed to Payment
                  </button>
                </>
              ) : (
                <p className="text-center mb-0">Your cart is empty</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showAgreement && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Agreement</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowAgreement(false)}></button>
              </div>
              <div className="modal-body">
                <p>By joining these trips, you agree to the following conditions:</p>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">No use of drugs or alcohol during travel.</li>
                  <li className="list-group-item">No disturbance to other passengers.</li>
                  <li className="list-group-item">We reserve the right to take action if any rules are violated.</li>
                </ul>
                <h4 className="text-primary">Total Amount: Rs.{totalAmount.toLocaleString()}</h4>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setShowAgreement(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-warning" 
                  onClick={handleAccept}
                  style={{ backgroundColor: '#FFA500', borderColor: '#FFA500' }}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  );
};

export default PackagesPage;
