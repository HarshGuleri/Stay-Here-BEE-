import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomSlider = ({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const totalSlides = items.length;
  const slidesPerView = 4;

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => Math.min(prevSlide + 1, totalSlides - slidesPerView));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const handleBookNow = (roomId) => {
  const auth = localStorage.getItem('user'); // changed from 'token'
  if (!auth) {
    alert('Please log in to book a room.');
    navigate('/login');
  } else {
    navigate(`/room-details/${roomId}`);
  }
};


  return (
    <div className="custom-slider">
      <div className="slider-container">
        {items.slice(currentSlide, currentSlide + slidesPerView).map((item, index) => (
          <div key={index} className="slide">
            <div className="slide-card">
              <img src={item.image} alt={item.title} />
              <div className="slide-content">
                <h2>{item.title}</h2>
                <p>Price: ₹{item.price}</p>
                <div className="button-flex">
                  <button className="book-now-btn" onClick={() => handleBookNow(item.id)}>
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-controls">
        <button onClick={prevSlide} disabled={currentSlide === 0}>{'<'}</button>
        <button onClick={nextSlide} disabled={currentSlide >= totalSlides - slidesPerView}>{'>'}</button>
      </div>
    </div>
  );
};

export default CustomSlider;
