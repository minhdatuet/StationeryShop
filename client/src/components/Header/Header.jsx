
import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import './Header.css';
import { FaSearch } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { PiShoppingCartBold } from "react-icons/pi";

export const Header = () => {
  const dispatch = useDispatch()
  const { isLogged } = useSelector(state => state.auth)

  const addBorderWhenClickSearch = () => {
    document.querySelector(".searchBarContainer").classList.add("searchBarBordered");
  }

  const removeSearchBorder = () => {
    document.querySelector(".searchBarContainer").classList.remove("searchBarBordered");
  }

  return (
    
    <div id="headerContainer">
      <div className="leftPart">
        <div className="logoContainer">
          <img src="" alt="" />
          Logo
        </div>

        <div className="searchBarContainer"
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
      
      {!isLogged && <li>
            <Link to='/login'>
              Đăng nhập
            </Link>
          </li>}
          {isLogged  && <li onClick={() => dispatch(actions.logout())}>

            <Link to='/login'>
              <div>Đăng xuất</div>
            </Link>
          </li>} 
    </div>
  )
}

export default Header
