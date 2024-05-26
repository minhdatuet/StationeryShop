import React from 'react';
import { FaFacebook, FaInstagram, FaGithub, FaCopyright } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import style from './Footer.module.scss';

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className={clsx(style.container)}>
      <div className={clsx(style.footer)}>
        <div className={clsx(style["about-us"])}>
          <h2 onClick={() => {navigate('/about-us')}}>About Us</h2>
          <a href="">About DDD Shop</a>
          <a href="">Our Future Plans</a>
          <a href="">Team Member</a>
        </div>

        <div className={clsx(style.policy)}>
          <h2 onClick={() => {navigate('/policy')}}>Our Policy</h2>
          <a href="">Privacy Policy</a>
          <a href="">Refund Policy</a>
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
