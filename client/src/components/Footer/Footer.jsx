import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaGithub, FaCopyright } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="container">
      <div className="footer">
        <div className="about-us">
          <h2>About Us</h2>
          <a href="">About DDD Shop</a>
          <a href="">Our Future Plans</a>
          <a href="">Team Member</a>
        </div>

        <div className="policy">
          <h2>Our Policy</h2>
          <a href="">Privacy Policy</a>
          <a href="">Refund Policy</a>
        </div>

        <div className="contact-us">
          <h2>Contact Us</h2>
          <FaFacebook className='facebook_icon'/>
          <FaInstagram className='instagram_icon'/>
          <FaGithub className='github_icon'/>
        </div>
      </div>

      <div className="my_company">
        <FaCopyright className='copyright_icon'/> DDD Shop 
      </div>
    </div>
  )
}

export default Footer;
