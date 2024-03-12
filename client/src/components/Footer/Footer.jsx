import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaGithub, FaCopyright } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="container">
      <div className="footer">
        <div className="about_us">
          <h2>Về chúng tôi</h2>
          <a href="">Giới thiệu về DDD Shop</a>
          <a href="">Dự định tương lai</a>
          <a href="">Thành viên dự án</a>
        </div>

        <div className="policy">
          <h2>Chính sách</h2>
          <a href="">Chính sách bảo mật</a>
          <a href="">Chính sách hoàn tiền</a>
        </div>

        <div className="contact_us">
          <h2>Liên hệ với chúng tôi</h2>
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
