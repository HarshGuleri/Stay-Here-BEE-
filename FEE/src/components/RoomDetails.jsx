
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './roomdetails.css'; // Make sure this CSS exists

const RoomDetails = ({ items }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const room = items.find(item => item?._id?.toString() === id);

  const [serverBookings, setServerBookings] = useState([]);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  // Filter function to get only upcoming and ongoing bookings
  const getUpcomingAndOngoingBookings = (bookings) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
    
    return bookings.filter(booking => {
      const checkOutDate = new Date(booking.checkOut);
      checkOutDate.setHours(0, 0, 0, 0);
      
      // Include bookings that end today or in the future
      return checkOutDate >= today;
    });
  };

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/rooms/calendar/${id}`);
        const data = await res.json();
        setServerBookings(data.bookedDates || []);
      } catch (err) {
        console.error("Failed to fetch booked dates", err);
      }
    };

    fetchBookedDates();
  }, [id]);

  // Get filtered bookings for display
  const upcomingAndOngoingBookings = getUpcomingAndOngoingBookings(serverBookings);

  const handleBooking = async () => {
  const auth = localStorage.getItem('user');

  if (!auth) {
    localStorage.setItem('redirectAfterLogin', `/room-details/${room._id}`);
    alert('Please log in to book this room.');
    navigate('/login');
    return;
  }

  if (!checkIn || !checkOut) {
    alert('Please select check-in and check-out dates.');
    return;
  }

  // ✅ Get userId from token
  let userId;
  try {
    const payload = JSON.parse(atob(auth.split('.')[1]));
    userId = payload.id || payload._id;
    if (!userId) throw new Error('userId not found in token');
  } catch (err) {
    console.error("Token decode error:", err);
    alert("Login token is invalid.");
    return;
  }

  console.log("Sending booking request with:", {
    roomId: room._id,
    checkIn,
    checkOut,
    userId
  });

  try {
    const res = await fetch(`http://localhost:5000/api/rooms/book/${room._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkIn, checkOut, userId }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Booking failed:", data);
      alert(data.error || 'Booking failed');
      return;
    }

    alert('✅ Room booked successfully!');
    setServerBookings([...serverBookings, { checkIn, checkOut }]);
  } catch (err) {
    console.error("Network or server error:", err);
    alert("Something went wrong. Check console.");
  }
};


  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="father">
      <div className="containerX">
        <div className="first-cont">
          <div className="imageCont">
            <img className="image-in" src={room.image} alt={room.title} />
          </div>
          <div className="Discrp">
            <div className="uppCorn">
              <h1>{room.title}</h1>
              <p><b>Price: ₹</b>{room.price}</p>
              <p><b>Size:</b> {room.size}</p>
              <p><b>Bed:</b> {room.bed}</p>
              <p><b>Bathroom:</b> {room.bathroom}</p>
              <p><b>View:</b> {room.view}</p>
              <p><b>Connectivity:</b> {room.connectivity}</p>
            </div>
          </div>
        </div>

        <div className="lowCorn">
          <div className="additional-details">
            <h2>More Features :-</h2>
            <p><b>Entertainment:</b> {room.entertainment}</p>
            <p><b>Amenities:</b> {room.amenities}</p>
            <p><b>Services:</b> {room.services}</p>
          </div>

          <div className='additional-buttons'>
            <Link to="/">
              <button className="back-home">Back to Home</button>
            </Link>
          </div>

          <div className="booking-section">
            <h2>Book This Room</h2>

            <div style={{ marginBottom: '10px' }}>
              <DatePicker
                selected={checkIn}
                onChange={date => setCheckIn(date)}
                selectsStart
                startDate={checkIn}
                endDate={checkOut}
                excludeDateIntervals={serverBookings.map(b => ({
                  start: new Date(b.checkIn),
                  end: new Date(b.checkOut)
                }))}
                placeholderText="Select check-in date"
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <DatePicker
                selected={checkOut}
                onChange={date => setCheckOut(date)}
                selectsEnd
                startDate={checkIn}
                endDate={checkOut}
                minDate={checkIn}
                excludeDateIntervals={serverBookings.map(b => ({
                  start: new Date(b.checkIn),
                  end: new Date(b.checkOut)
                }))}
                placeholderText="Select check-out date"
              />
            </div>

            <button onClick={handleBooking} className='back-home'>Confirm Booking</button>

            {upcomingAndOngoingBookings.length > 0 && (
              <div>
                <h3>Upcoming & Ongoing Bookings:</h3>
                <ul>
                  {upcomingAndOngoingBookings.map((b, i) => {
                    const checkInDate = new Date(b.checkIn);
                    const checkOutDate = new Date(b.checkOut);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    const isOngoing = checkInDate <= today && checkOutDate >= today;
                    const status = isOngoing ? ' (Ongoing)' : ' (Upcoming)';
                    
                    return (
                      <li key={i}>
                        {checkInDate.toLocaleDateString()} to {checkOutDate.toLocaleDateString()}{status}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
