import React, { useState, useEffect } from 'react';
import Footer from './Footer';
// import NavBar from './NavBar';
import '../App.css';

const Body = ({ rooms }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');

  const [filteredRooms, setFilteredRooms] = useState([]);
  const [showAllRooms, setShowAllRooms] = useState(false);
  const [displayedRooms, setDisplayedRooms] = useState([]);

  useEffect(() => {
    setFilteredRooms(rooms); // set initially
    // Initially show only first 4 rooms
    setDisplayedRooms(rooms.slice(0, 4));
  }, [rooms]);

  const handleAvailabilityCheck = async (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      alert("Please fill both dates");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/rooms/check-availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ checkIn, checkOut, adults, children })
      });

      const data = await res.json();
      setFilteredRooms(data);
      setDisplayedRooms(data.slice(0, 4));
      setShowAllRooms(false);
    } catch (err) {
      console.error(err);
      alert("Error checking availability");
    }
  };

  const handleShowMore = () => {
    if (showAllRooms) {
      setDisplayedRooms(filteredRooms.slice(0, 4));
      setShowAllRooms(false);
    } else {
      setDisplayedRooms(filteredRooms);
      setShowAllRooms(true);
    }
  };

  return (
    <div className='father'>
      {/* <NavBar /> */}

      <div className="image-container">
        <img
          className="image"
          src="https://images.unsplash.com/photo-1418513110185-f0ec221e47b4?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Hotel"
        />
        <div className="text-1">
          <h1>Search Hotels around India</h1>
          <p className='line'>
            Enter your check-in and check-out dates and choose from several hotels and other places to stay!
          </p>
        </div>

        {/* Search Bar */}
        <section className="searchBar">
          <div className="container_flex_space">
            <div className="text2">
              <h1 className="head2"><span>Book </span>Your Rooms</h1>
            </div>
            <div className="form">
              <form className="grid" onSubmit={handleAvailabilityCheck}>
                <input
                  type="date"
                  placeholder="Check In"
                  name="check-in"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
                <input
                  type="date"
                  placeholder="Check Out"
                  name="check-out"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Adults"
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Children"
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
                />
                <input type="submit" value="Check Availability" />
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* Room Section */}
      <section className="rooms">
  <div className="container_top">
    <div className="heading">
      <h1>EXPLORE</h1>
      <h2>Our Rooms</h2>
      <p>Here are some of the high rating Hotel rooms...</p>
    </div>
  </div>


  <div className="rooms-grid">
    {displayedRooms.map((room) => (
      <div key={room._id} className="room-card">
        <img src={room.image} alt={room.title} />
        <div className="room-content">
          <h3>{room.title}</h3>
          <p>{room.description}</p>
          <p className="price">Price: ₹{room.price}</p>
          <button className="book-now-btn" onClick={() => window.location.href = `/room-details/${room._id}`}>
            View Room
          </button>
        </div>
      </div>
    ))}
  </div>
  
  {filteredRooms.length > 4 && (
    <div className="show-more-container">
      <button className="show-more-btn" onClick={handleShowMore}>
        {showAllRooms ? 'Show Less' : 'Show More'}
      </button>
    </div>
  )}
</section>

{/* Section 4 content */}
      <section className="section4">
        <h1 className='head-one'>Seamless Stays Await: </h1>
        <section className="section4_1">
          <div className="div1">
            <p>"Discover convenience and choice with our room booking platform. Whether you're planning a business trip or a weekend getaway, our site offers a wide range of accommodations to suit every preference and budget. Browse through a diverse selection of hotels, guesthouses, and apartments in various destinations. With user-friendly features, secure booking options, and real-time availability updates, finding the perfect place for your stay has never been easier. Book with confidence and embark on your next adventure with our seamless room booking experience.</p>
          </div>
          <div className="div2">
            <img src="india-2-ss.jpg" alt="India" />
          </div>
        </section>
      </section>

      <Footer />
    </div>
  );
};

export default Body;
