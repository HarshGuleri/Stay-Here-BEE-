import React from 'react'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Stay ~Here</h3>
          <p>Your trusted partner for comfortable and luxurious accommodations across India. Discover the perfect stay for your next adventure.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Booking Guide</a></li>
            <li><a href="#">Cancellation Policy</a></li>
            <li><a href="#">Customer Support</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <div className="contact-info">
            <p>📍 Chitkara University, Punjab</p>
            <p>📧 harshguleri5@gmail.com</p>
            <p>📞 858 068 5472</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 Stay ~Here. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Disclaimer</a>
        </div>
      </div>
    </div>
  )
}

export default Footer
