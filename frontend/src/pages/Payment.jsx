import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!bookingDetails) {
      navigate('/dashboard');
    }
  }, [bookingDetails, navigate]);

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate Fake Payment Delay
    setTimeout(async () => {
      try {
        // Prepare payload for backend
        const payload = {
          name: bookingDetails.name,
          email: bookingDetails.email,
          room: bookingDetails.roomName,
          checkIn: bookingDetails.checkIn,
          checkOut: bookingDetails.checkOut,
          price: bookingDetails.price
        };

        const response = await axios.post('http://localhost:5000/api/book-room', payload);
        
        if (response.data.success) {
          navigate('/success', { state: { invoiceData: response.data.data } });
        } else {
          setError('Booking failed from server.');
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setError('Error connecting to server. Is the backend running?');
        setLoading(false);
      }
    }, 2500);
  };

  if (!bookingDetails) return null;

  return (
    <div className="payment-container">
      <h2 className="page-title">Secure Payment</h2>
      
      <div className="payment-box">
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>Amount to Pay</p>
          <h3 style={{ fontSize: '2rem', color: 'var(--primary)' }}>₹{bookingDetails.totalAmount}</h3>
        </div>

        <form onSubmit={handlePayment}>
          <div className="form-group">
            <label>Card Number</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="0000 0000 0000 0000" 
              maxLength="19"
              required 
            />
          </div>
          <div className="payment-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="MM/YY" 
                maxLength="5"
                required 
              />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="123" 
                maxLength="3"
                required 
              />
            </div>
          </div>
          <div className="form-group">
            <label>Name on Card</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="John Doe" 
              defaultValue={bookingDetails.name}
              required 
            />
          </div>

          {error && <span className="error-msg" style={{ display: 'block', marginBottom: '1rem', textAlign: 'center' }}>{error}</span>}

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Processing...
              </>
            ) : (
              'Pay Now'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
