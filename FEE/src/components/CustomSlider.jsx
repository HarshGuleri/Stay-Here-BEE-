import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomSlider.css';


const CustomSlider = ({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();


  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleNext = () => {
    if (currentIndex < items.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Swipe Logic
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      // Swiped Left
      handleNext();
    } else if (diff < -50) {
      // Swiped Right
      handlePrev();
    }

    // Reset
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const totalSlides = items.length;
  const slidesPerView = 4;

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => Math.min(prevSlide + 1, totalSlides - slidesPerView));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const handleBookNow = (roomId) => {
    navigate(`/room-details/${roomId}`);
  };


  return (
    <div className="custom-slider">
      <div className="slider-container" 
      onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        {items && items.length > 0 ? (
          items.slice(currentSlide, currentSlide + slidesPerView).map((item, index) => (
            <div key={index} className="slide">
              <div className="slide-card">
                <img src={item.image} alt={item.title} />
                <div className="slide-content">
                  <h2>{item.title}</h2>
                  <p>Price: ₹{item.price}</p>
                  <div className="button-flex">
                    <button className="book-now-btn" onClick={() => handleBookNow(item._id)}>
                      View Room
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-rooms">No rooms available</p>
        )}

      </div>
      <div className="slider-controls">
        <button onClick={prevSlide} disabled={currentSlide === 0}>{'<'}</button>
        <button onClick={nextSlide} disabled={currentSlide >= totalSlides - slidesPerView}>{'>'}</button>
      </div>
    </div>
  );
};

export default CustomSlider;
