import React from 'react';
import { FaFacebook, FaInstagram, FaGithub, FaCopyright } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import style from './Footer.module.scss';
import { Link as RouterLink } from "react-router-dom";
import { scroller } from 'react-scroll';

export const Footer = () => {
  const navigate = useNavigate();

  const handleClickAboutUs = () => {
    navigate('/about-us');
    window.scrollTo(0, 0);
  }

  const scrollToElement = (elementId) => {
    setTimeout(() => {
      scroller.scrollTo(elementId, {
        duration: 500,
        delay: 0,
        smooth: true
      });
    }, 100);
  };

  return (
    <div className={clsx(style.container)}>
      <div className={clsx(style.footer)}>
        <div className={clsx(style["about-us"])}>
          <h2 onClick={handleClickAboutUs}>About Us</h2>
          <RouterLink to="/about-us" onClick={() => scrollToElement('about-ddd-shop')}>About DDD Shop</RouterLink>
          <RouterLink to="/about-us" onClick={() => scrollToElement('our-plans')}>Our Future Plans</RouterLink>
          <RouterLink to="/about-us" onClick={() => scrollToElement('team-member')}>Team Member</RouterLink>
        </div>

        <div className={clsx(style.policy)}>
          <h2 onClick={() => { navigate('/policy') }}>Our Policy</h2>
          <RouterLink to="/policy" onClick={() => scrollToElement('privacy-policy')}>Privacy Policy</RouterLink>
          <RouterLink to="/policy" onClick={() => scrollToElement('refund-policy')}>Refund Policy</RouterLink>
        </div>

        <div className={clsx(style["contact-us"])}>
          <h2>Contact Us</h2>
          <FaFacebook className={clsx(style.facebook_icon)} />
          <FaInstagram className={clsx(style.instagram_icon)} />
          <FaGithub className={clsx(style.github_icon)} />
        </div>
      </div>

      <div className={clsx(style["my-company"])}>
        <FaCopyright className={clsx(style.copyright_icon)} /> DDD Shop
      </div>
    </div>
  )
}

export default Footer;
