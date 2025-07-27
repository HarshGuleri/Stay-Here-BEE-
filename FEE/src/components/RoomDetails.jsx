import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './roomdetails.css'; // Make sure this CSS exists

const RoomDetails = ({ items }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const room = items.find(item => item?._id?.toString() === id);

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('bookings');
    return saved ? JSON.parse(saved) : {};
  });

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleBooking = () => {
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

    const roomId = room._id;
    const currentBookings = bookings[roomId] || [];

    const isBooked = currentBookings.some(b =>
      new Date(checkIn) < new Date(b.checkOut) &&
      new Date(checkOut) > new Date(b.checkIn)
    );

    if (isBooked) {
      alert('❌ Room already booked for these dates.');
      return;
    }

    const updatedBookings = {
      ...bookings,
      [roomId]: [...currentBookings, { checkIn, checkOut }]
    };

    setBookings(updatedBookings);
    alert('✅ Room booked successfully!');
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
              {/* <p><b>Room Type:</b> {room.roomType}</p> */}
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
            <input
              className='input-date'
              type="date"
              value={checkIn}
              onChange={e => setCheckIn(e.target.value)}
            />
            <input
              className='input-date'
              type="date"
              value={checkOut}
              onChange={e => setCheckOut(e.target.value)}
            />
            <button onClick={handleBooking} className='back-home'>Confirm Booking</button>

            {bookings[room._id]?.length > 0 && (
              <div>
                <h3>Already Booked Dates:</h3>
                <ul>
                  {bookings[room._id].map((b, i) => (
                    <li key={i}>{b.checkIn} to {b.checkOut}</li>
                  ))}
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
