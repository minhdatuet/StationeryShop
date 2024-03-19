
import React, { useState } from 'react';
import style from './Header.module.scss';
import clsx from 'clsx';
import { FaSearch } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { PiShoppingCartBold } from "react-icons/pi";

export const Header = () => {

  const [isSearchBorder, setIsSearchBorder] = useState(false);

  const addBorderWhenClickSearch = () => {
    setIsSearchBorder(true);
  }

  const removeSearchBorder = () => {
    setIsSearchBorder(false);
  }

  return (
    
    <div id={clsx(style.headerContainer)}>
      <div className={clsx(style.leftPart)}>
        <div className={clsx(style.logoContainer)}>
          <img src="" alt="" />
          Logo
        </div>

        <div className={clsx(style.searchBarContainer, {[style.searchBarBordered] : isSearchBorder})}
        onClick={
          () => {
            addBorderWhenClickSearch();
          }
        }

        onBlur={
          () => {
            removeSearchBorder();
          }
        }
        >
          <input className={clsx(style.searchBar)} type="text" placeholder='Search'/>

          <div className={clsx(style.searchBtn)}>
            <FaSearch />
            <p>Search</p>
          </div>
        </div>
      </div>
      
      <div className={clsx(style.rightPart)}>
        <div className={clsx(style.accountContainer)}>
          <MdOutlineAccountCircle />
          <p>Account</p>
        </div>

        <div className={clsx(style.cartContainer)}>
          <PiShoppingCartBold />
          <p>Cart</p>
        </div>
      </div>

    </div>
  )
}

export default Header
