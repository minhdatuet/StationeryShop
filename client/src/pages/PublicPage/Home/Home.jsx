import React, { Fragment, useState } from 'react';
import style from './Home.module.scss';
import clsx from 'clsx';
import Backpack from './components/Backpack/Backpack';
import Book from './components/Book/Book';
import Casio from './components/Casio/Casio';
import Desklamp from './components/Desklamp/Desklamp';
import Notebook from './components/Notebook/Notebook';
import Pen from './components/Pen/Pen';
import SchoolSupply from './components/SchoolSupply/SchoolSupply';
import StationerySupply from './components/StationerySupply/StationerySupply';
import StoryBook from './components/StoryBook/StoryBook';
import TableAndChair from './components/TableAndChair/TableAndChair';

export const Home = () => {
  return (
    <Fragment>
      <Backpack />
      <Book />
      <Casio />
      <Desklamp />
      <Notebook />
      <Pen />
      <SchoolSupply />
      <StationerySupply />
      <StoryBook />
      <TableAndChair />
    </Fragment>
  )
}

export default Home;
