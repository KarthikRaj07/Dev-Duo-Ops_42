import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceData = location.state?.invoiceData;

  useEffect(() => {
    if (!invoiceData) {
      navigate('/');
    }
  }, [invoiceData, navigate]);

  if (!invoiceData) return null;

  const handlePrint = () => {
    if (invoiceData.invoiceUrl) {
      window.open(invoiceData.invoiceUrl, '_blank');
    } else {
      window.print();
    }
  };

  return (
    <div className="success-container">
      <div className="invoice-card" id="printable-invoice">
        <div className="success-header">
          <div className="success-icon">✓</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--success)' }}>Booking Confirmed 🎉</h2>
          <p style={{ color: 'var(--text-muted)' }}>Thank you for your reservation!</p>
        </div>

        <div className="invoice-details">
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            Invoice Details
          </h3>
          <div className="invoice-item">
            <span className="invoice-label">Booking ID</span>
            <span className="invoice-value">{invoiceData.bookingId}</span>
          </div>
          <div className="invoice-item">
            <span className="invoice-label">Customer Name</span>
            <span className="invoice-value">{invoiceData.customerName}</span>
          </div>
          <div className="invoice-item">
            <span className="invoice-label">Email Address</span>
            <span className="invoice-value">{invoiceData.email}</span>
          </div>
          <div className="invoice-item">
            <span className="invoice-label">Room Type</span>
            <span className="invoice-value">{invoiceData.roomName}</span>
          </div>
          <div className="invoice-item">
            <span className="invoice-label">Check-in</span>
            <span className="invoice-value">{invoiceData.checkIn}</span>
          </div>
          <div className="invoice-item">
            <span className="invoice-label">Check-out</span>
            <span className="invoice-value">{invoiceData.checkOut}</span>
          </div>
          <div className="invoice-item">
            <span className="invoice-label">Total Days</span>
            <span className="invoice-value">{invoiceData.totalDays}</span>
          </div>
          <div className="invoice-item">
            <span className="invoice-label">Price per Night</span>
            <span className="invoice-value">₹{invoiceData.pricePerNight}</span>
          </div>
          <div className="invoice-item" style={{ marginTop: '0.5rem', paddingTop: '1rem', borderTop: '2px solid var(--border-color)' }}>
            <span className="invoice-label" style={{ fontSize: '1.125rem', color: 'var(--text-main)' }}>Total Amount</span>
            <span className="invoice-value" style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>₹{invoiceData.totalAmount}</span>
          </div>
          <div className="invoice-item">
            <span className="invoice-label">Payment Status</span>
            <span className="invoice-value" style={{ color: 'var(--success)' }}>{invoiceData.paymentStatus}</span>
          </div>
        </div>

        <div className="invoice-actions no-print">
          <button className="btn-secondary" onClick={handlePrint}>Download Invoice</button>
          <button className="btn-primary" onClick={() => navigate('/')}>Go to Home</button>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 2rem;
            box-shadow: none;
          }
          .no-print {
            display: none !important;
          }
        }
      `}} />
    </div>
  );
};

export default Success;
