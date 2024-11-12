import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CustomSlider = ({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = items.length;
  const slidesPerView = 4; // Number of slides to show in series

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => Math.min(prevSlide + 1, totalSlides - slidesPerView));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  return (
    <div className="custom-slider">
      <div className="slider-container">
        {items.slice(currentSlide, currentSlide + slidesPerView).map((item, index) => (
          <div
            key={index}
            className={`slide ${index === 0 ? 'active' : ''}`}
          >
            <div className="slide-card">
              <img src={item.image} alt={item.title} />
              <div className="slide-content">
                <h2>{item.title}</h2>
                {/* <p>{item.description}</p> */}
                <p>Price: ₹{item.price}</p>
                <div className='button-flex'>
                  <Link to={`/room-details/${item.id}`}>
                    <button className="book-now-btn">BOOK NOW</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-controls">
        <button onClick={prevSlide} disabled={currentSlide === 0}>
          {'<'}
        </button>
        <button onClick={nextSlide} disabled={currentSlide >= totalSlides - slidesPerView}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default CustomSlider;

