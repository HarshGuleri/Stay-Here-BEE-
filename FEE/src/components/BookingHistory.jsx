import React, { useState, useEffect } from 'react';
import './bookingHistory.css';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const token = localStorage.getItem('user');
        if (!token) {
          setError('Please login to view your bookings');
          setLoading(false);
          return;
        }

        // Extract userId from token
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id || payload._id;

        const response = await fetch(`http://localhost:5000/api/rooms/user-bookings/${userId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch bookings');
        }

        setBookings(data.bookings || []);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, []);

  const getBookingStatus = (checkIn, checkOut) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    checkInDate.setHours(0, 0, 0, 0);
    checkOutDate.setHours(0, 0, 0, 0);

    if (checkInDate <= today && checkOutDate >= today) {
      return { status: 'ongoing', label: 'Ongoing', color: '#4CAF50' };
    } else if (checkInDate > today) {
      return { status: 'upcoming', label: 'Upcoming', color: '#2196F3' };
    } else {
      return { status: 'completed', label: 'Completed', color: '#9E9E9E' };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="booking-history-container">
        <div className="loading">Loading your bookings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="booking-history-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="booking-history-container">
      <h2 className="booking-history-title">My Booking History</h2>
      
      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You haven't made any bookings yet.</p>
          <a href="/" className="browse-rooms-btn">Browse Available Rooms</a>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking, index) => {
            const statusInfo = getBookingStatus(booking.checkIn, booking.checkOut);
            
            return (
              <div key={index} className="booking-card">
                <div className="booking-image">
                  <img src={booking.roomImage} alt={booking.roomTitle} />
                  <div 
                    className="status-badge"
                    style={{ backgroundColor: statusInfo.color }}
                  >
                    {statusInfo.label}
                  </div>
                </div>
                
                <div className="booking-details">
                  <h3 className="room-title">{booking.roomTitle}</h3>
                  
                  <div className="booking-dates">
                    <div className="date-item">
                      <span className="date-label">Check-in:</span>
                      <span className="date-value">{formatDate(booking.checkIn)}</span>
                    </div>
                    <div className="date-item">
                      <span className="date-label">Check-out:</span>
                      <span className="date-value">{formatDate(booking.checkOut)}</span>
                    </div>
                  </div>
                  
                  <div className="booking-actions">
                    <button 
                      className="view-room-btn"
                      onClick={() => window.open(`/room-details/${booking.roomId}`, '_blank')}
                    >
                      View Room
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookingHistory; 