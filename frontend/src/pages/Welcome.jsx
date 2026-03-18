import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">My Hotel Booking</h1>
      <p className="welcome-subtitle">Experience luxury and comfort in our premium rooms. Seamless booking process guaranteed.</p>
      <button 
        className="btn-primary" 
        style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }}
        onClick={() => navigate('/dashboard')}
      >
        View Rooms
      </button>
    </div>
  );
};

export default Welcome;
