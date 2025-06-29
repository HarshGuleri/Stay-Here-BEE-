import React from 'react';
import CustomSlider from './CustomSlider';
import { useState } from 'react';
import Footer from './Footer';
import NavBar from './NavBar'
import '../App.css';

const Body = ({ items }) => {

const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');
  const [filteredRooms, setFilteredRooms] = useState(items); // initially show all

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
      body: JSON.stringify({ checkIn, checkOut })
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
      {/* Header section */}
      <NavBar/>

      {/* Main content section */}
      <div className="image-container">
        <img className="image" src="https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706745600&semt=ais" alt="Hotel" />
        <div className="text-1">
          <h1>Search Hotels around India</h1>
          <p className='line'>Enter your check-in and check-out dates and choose from several hotels and other places to stay!</p>
        </div>
        <section className="searchBar">
          {/* ... your existing searchBar code */}
          <div className="container_flex_space">
            <div className="text2">
              <h1 className="head2"><span>Book </span>Your Rooms</h1>
            </div>
            <div className="form">
              <form className="grid">
                <input type="date" placeholder="Check In" name="check-in" />
                <input type="date" placeholder="Check Out" name="check-out" />
                <input type="number" placeholder="Adults" />
                <input type="number" placeholder="Children" />
                <input type="submit" value="Check Availability" />
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* Slider section */}
      <section className="rooms">
        <div className="container_top">
          <div className="heading">
            <h1>EXPLORE</h1>
            <h2>Our Rooms</h2>
            <p>Here are some of the high rating Hotel rooms...</p>
          </div>
        </div>
      </section>
      <CustomSlider items={items} />

      {/* Section 4 content */}
      <section className="section4">
        <h1>Seamless Stays Await: </h1>
        <section className="section4_1">
          <div className="div1">
            <p>"Discover convenience and choice with our room booking platform. Whether you're planning a business trip or a weekend getaway, our site offers a wide range of accommodations to suit every preference and budget. Browse through a diverse selection of hotels, guesthouses, and apartments in various destinations. With user-friendly features, secure booking options, and real-time availability updates, finding the perfect place for your stay has never been easier. Book with confidence and embark on your next adventure with our seamless room booking experience.</p>
          </div>
          <div className="div2">
            <img src="india-2-ss.jpg" alt="India" />
          </div>
        </section>
      </section>

      {/* ... any other content you want to add */}
      <Footer />
    </div>
  );
};

export default Body;
