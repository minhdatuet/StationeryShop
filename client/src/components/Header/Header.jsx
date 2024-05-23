
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import './Header.module.scss';
import style from './Header.module.scss';
import clsx from 'clsx';
import { FaSearch } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { PiShoppingCartBold } from "react-icons/pi";
import Cart from '../Cart/Cart';

export const Header = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate();
  console.log(localStorage);
  const { isLogged } = useSelector(state => state.auth)
  const { userData } = useSelector(state => state.user)
  const [isSearchBorder, setIsSearchBorder] = useState(false);
  const [searchText, setSearchText] = useState('');

  const addBorderWhenClickSearch = () => {
    setIsSearchBorder(true);
  }

  const removeSearchBorder = () => {
    setIsSearchBorder(false);
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/productlist?search=${encodeURIComponent(searchText)}`);
    }
  }

  return (
    <div id={clsx(style.headerContainer)}>
      <div className={clsx(style.leftPart)}>
        <div className={clsx(style.logoContainer)}>
          <img src="" alt="" />
          Logo
        </div>

        <form 
          className={clsx(style.searchBarContainer, { [style.searchBarBordered]: isSearchBorder })}
          onSubmit={handleSearchSubmit}
        >
          <input 
            className={clsx(style.searchBar)} 
            type="text" 
            placeholder='Search' 
            value={searchText}
            onChange={handleSearchChange}
            onClick={addBorderWhenClickSearch}
            onBlur={removeSearchBorder}
          />
          <button type="submit" className={clsx(style.searchBtn)}>
            <FaSearch />
            <p>Search</p>
          </button>
        </form>
      </div>

      <div className={clsx(style.rightPart)}>
        <div className={clsx(style.accountContainer)}
        onClick={() => {
          if(isLogged) {
            navigate('/personal')
          }
          else {
            navigate('/login')
          }
        }}
        >
          <MdOutlineAccountCircle />
          {
            !isLogged?<p>  Account</p>:<p>  {localStorage.getItem('name')}</p>
          }
          
        </div>

        <div className={clsx(style.cartContainer)}>
          <div><Cart /></div>
          <p>Cart</p>
        </div>
      </div>

      {/* {!isLogged && <li>
        <Link to='/login'>
          Đăng nhập
        </Link>
      </li>}
      {isLogged && <li onClick={() => {
        dispatch(actions.logout());
        localStorage.setItem('id', '');
        localStorage.setItem('name', '');
      }}>
        <Link to='/login'>
          <div>Đăng xuất</div>
        </Link>
      </li>} */}
    </div>
  );
}

export default Header;
