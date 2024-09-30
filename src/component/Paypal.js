import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '/home/uki-student/Downloads/mine/freshmyf-main/src/component/Payment.css';

const PaymentPageComponent = () => {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const navigate = useNavigate();

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (!amount || !cardNumber) {
      alert('Please fill in all the fields.');
      return;
    }

    // Navigate to the mock bank API page with payment details
    navigate('/bankapi', { state: { amount, cardNumber } });
  };

  return (
    <div className="payment-container">
      <h1>Payment Page</h1>
      <form className="payment-form" onSubmit={handlePaymentSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount (LKR)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="Enter amount"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
            placeholder="Enter card number"
          />
        </div>
        <button type="submit" className="payment-button">Proceed to Bank API</button>
      </form>
    </div>
  );
};

export default PaymentPageComponent;
