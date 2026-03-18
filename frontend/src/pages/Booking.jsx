import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state?.room;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkIn: '',
    checkOut: ''
  });
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!room) {
      navigate('/dashboard');
    }
  }, [room, navigate]);

  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      const start = new Date(formData.checkIn);
      const end = new Date(formData.checkOut);
      
      if (end > start) {
        const diffTime = Math.abs(end - start);
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setTotalDays(days);
        setTotalAmount(days * room.price);
        setError('');
      } else {
        setTotalDays(0);
        setTotalAmount(0);
        setError('Check-out date must be after check-in date');
      }
    }
  }, [formData.checkIn, formData.checkOut, room?.price]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalDays <= 0) {
      setError('Please select valid dates before proceeding');
      return;
    }
    
    // Store temporarily and navigate
    const bookingDetails = {
      ...formData,
      roomName: room.name,
      price: room.price,
      totalDays,
      totalAmount
    };
    
    navigate('/payment', { state: { bookingDetails } });
  };

  // Get today's date in YYYY-MM-DD format for min attributes
  const today = new Date().toISOString().split('T')[0];

  if (!room) return null;

  return (
    <div className="booking-container">
      <h2 className="page-title">Complete Your Booking</h2>
      
      <div className="form-layout">
        <div className="booking-summary">
          <img src={room.image} alt={room.name} />
          <h3 className="room-name">{room.name}</h3>
          <p className="room-price">₹{room.price} / night</p>
          
          {totalDays > 0 && (
            <div className="price-summary">
              <div className="price-row">
                <span>Total Days</span>
                <span>{totalDays}</span>
              </div>
              <div className="price-row">
                <span>Price per Night</span>
                <span>₹{room.price}</span>
              </div>
              <div className="price-total">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>
          )}
        </div>

        <div className="booking-form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name"
                className="form-input" 
                required 
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email"
                className="form-input" 
                required 
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Check-in Date</label>
              <input 
                type="date" 
                name="checkIn"
                className="form-input" 
                min={today}
                required 
                value={formData.checkIn}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Check-out Date</label>
              <input 
                type="date" 
                name="checkOut"
                className="form-input" 
                min={formData.checkIn || today}
                required 
                value={formData.checkOut}
                onChange={handleChange}
              />
            </div>

            {error && <span className="error-msg">{error}</span>}

            <button 
              type="submit" 
              className="btn-primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              disabled={!!error || !formData.name || !formData.email || !formData.checkIn || !formData.checkOut}
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
