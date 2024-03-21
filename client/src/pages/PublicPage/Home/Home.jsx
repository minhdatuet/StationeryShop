import React, { useState } from 'react';
import style from './Home.module.scss';
import clsx from 'clsx';
import Products from '../Products/Products';
import Baby_Pink_Rabbit_Backpack from '../../../assets/images/products/backpack/Baby-Pink-Rabbit-Backpack.png';
import Cute_Large_Capacity_Student_Backpack from '../../../assets/images/products/backpack/Cute-Large-Capacity-Student-Backpack.png';
import Day_Pack_Backpack_Grey_Scarab from '../../../assets/images/products/backpack/Day-Pack-Backpack-Grey-Scarab.png';
import DKMV_Logo_Backpack_Black from '../../../assets/images/products/backpack/DKMV-Logo-Backpack-Black.png';
import Jansport_Cool_Student_175_Backpack from '../../../assets/images/products/backpack/Jansport-Cool-Student-17.5-Backpack.png';
import Jansport_Womens_Cool_Student_Backpack from '../../../assets/images/products/backpack/Jansport-Womens-Cool-Student-Backpack.png';
import Lightweight_Solid_Color_High_School_Backpack from '../../../assets/images/products/backpack/Lightweight-Solid-Color-High-School-Backpack.png';
import Nike_Hayward_Backpack from '../../../assets/images/products/backpack/Nike-Hayward-Backpack.png';
import Nohoo_Frog_Backpack from '../../../assets/images/products/backpack/Nohoo-Frog-Backpack.png';
import Spy_x_Family_Anya_Forger_Anime_School_Backpack from '../../../assets/images/products/backpack/Spy-x-Family-Anya-Forger-Anime-School-Backpack.png';

export const Home = () => {
  const backpackImages = [Baby_Pink_Rabbit_Backpack, Cute_Large_Capacity_Student_Backpack, Day_Pack_Backpack_Grey_Scarab, DKMV_Logo_Backpack_Black, Jansport_Cool_Student_175_Backpack, Jansport_Womens_Cool_Student_Backpack, Lightweight_Solid_Color_High_School_Backpack, Nike_Hayward_Backpack, Nohoo_Frog_Backpack, Spy_x_Family_Anya_Forger_Anime_School_Backpack];

  return (
    <>
      {backpackImages.map((backpackImagePath, index) => (
        <div className="flex font-sans" key={index}>
          <div className="flex-none w-48 relative">
            <img src={backpackImagePath} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          </div>
          <form className="flex-auto p-6">
            <div className="flex flex-wrap">
              <h1 className="flex-auto text-lg font-semibold text-slate-900">
                Baby Pink Rabbit Backpack
              </h1>
              <div className="text-lg font-semibold text-slate-500">
                $110.00
              </div>
              <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                The Baby Pink Rabbit Backpack is an adorable and functional accessory for young children, featuring a charming rabbit design and ample storage space for school essentials. With its soft plush material and adjustable straps, it's perfect for adding a touch of whimsy to any child's day while keeping them organized on the go.
              </div>
            </div>
            <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"></div>
            <div className="flex space-x-4 mb-6 text-sm font-medium">
              <div className="flex-auto flex space-x-4">
                <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
                  Buy now
                </button>
                <button className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
                  Add to cart
                </button>
              </div>
              <button className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200" type="button" aria-label="Like">
                <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      ))}
    </>
  );
}

export default Home;
