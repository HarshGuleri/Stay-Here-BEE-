import React, { useState, useEffect } from 'react';
import CustomSlider from './CustomSlider';
import Footer from './Footer';
// import NavBar from './NavBar';
import '../App.css';

const Body = ({ rooms }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');

  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    setFilteredRooms(rooms); // set initially
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
    } catch (err) {
      console.error(err);
      alert("Error checking availability");
    }
  };

  return (
    <div className='father'>
      {/* <NavBar /> */}

      <div className="image-container">
        <img
          className="image"
          src="https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706745600&semt=ais"
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

  {/* 👇 This is the right place to show rooms */}
  {/* <div className="custom-slider">
    <div className="slider-container">
      {filteredRooms.map((room) => (
      <div key={room._id} className="slide-card">
        <img src={room.image} alt={room.name} />
        <div className="slide-content">
           <h3>{room.title}</h3>
        <p>DIs : {room.description}</p>
        <p>Price: ₹{room.price}</p>
        </div>
       
        <button>Book Now</button>
      </div>
    ))}
    </div>
    
  </div> */}

  <CustomSlider items={filteredRooms} />
</section>

      <Footer />
    </div>
  );
};

export default Body;
