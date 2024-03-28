
import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import './Header.module.scss';
import style from './Header.module.scss';
import clsx from 'clsx';
import { FaSearch } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { PiShoppingCartBold } from "react-icons/pi";

export const Header = () => {
  const dispatch = useDispatch()
  const { isLogged } = useSelector(state => state.auth)

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
