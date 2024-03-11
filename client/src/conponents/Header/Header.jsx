
import React from 'react';
import './Header.css';
import { FaSearch } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { PiShoppingCartBold } from "react-icons/pi";

export const Header = () => {
  return (
    
    <div id="headerContainer">
      <div className="leftPart">
        <div className="logoContainer">
          <img src="" alt="" />
          Logo
        </div>

        <div className="searchBarContainer">
          <input className="searchBar" type="text" placeholder='Search'/>

          <div className="searchBtn">
            <FaSearch />
            <p>Search</p>
          </div>
        </div>
      </div>
      
      <div className="rightPart">
        <div className="accountContainer">
          <MdOutlineAccountCircle />
          <p>Account</p>
        </div>

        <div className="cartContainer">
          <PiShoppingCartBold />
          <p>Cart</p>
        </div>
      </div>

    </div>
  )
}

export default Header
