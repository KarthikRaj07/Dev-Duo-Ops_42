import { useNavigate } from 'react-router-dom';

const MOCK_ROOMS = [
  {
    id: 1,
    name: 'Room 1 - Standard View',
    image: 'https://myhotel-buckets3.s3.amazonaws.com/img1.jpg',
    price: 2000,
  },
  {
    id: 2,
    name: 'Room 2 - City Scape',
    image: 'https://myhotel-buckets3.s3.amazonaws.com/img2.jpg',
    price: 2500,
  },
  {
    id: 3,
    name: 'Room 3 - Deluxe Suite',
    image: 'https://myhotel-buckets3.s3.amazonaws.com/img3.jpg',
    price: 3500,
  },
  {
    id: 4,
    name: 'Room 4 - Ocean Front',
    image: 'https://myhotel-buckets3.s3.amazonaws.com/img4.jpg',
    price: 4200,
  },
  {
    id: 5,
    name: 'Room 5 - Presidential Suite',
    image: 'https://myhotel-buckets3.s3.amazonaws.com/img5.jpg',
    price: 5000,
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleBook = (room) => {
    // Pass room data via state to the booking page
    navigate('/booking', { state: { room } });
  };

  return (
    <div className="dashboard-container">
      <h2 className="page-title">Available Rooms</h2>
      <div className="rooms-grid">
        {MOCK_ROOMS.map((room) => (
          <div key={room.id} className="room-card">
            <img src={room.image} alt={room.name} className="room-image" />
            <div className="room-details">
              <h3 className="room-name">{room.name}</h3>
              <p className="room-price">₹{room.price} / night</p>
              <button 
                className="btn-primary"
                onClick={() => handleBook(room)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
