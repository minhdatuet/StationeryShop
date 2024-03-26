import React, { Fragment, useState } from 'react';
import style from './Home.module.scss';
import clsx from 'clsx';
import Backpack from './components/Backpack/Backpack';

export const Home = () => {
  return (
    <Fragment>
      <Backpack />
    </Fragment>
  )
}

export default Home;
