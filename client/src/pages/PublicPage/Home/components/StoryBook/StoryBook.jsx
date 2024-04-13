import React, { useEffect, useState } from 'react';
import style from './StoryBook.module.scss';
import clsx from 'clsx';
import axios from 'axios';
import * as actions from '../../../../../store/actions';
import { apiGetProductInfoByCatalogId } from '../../../../../services/product';
import { useDispatch } from 'react-redux'

const StoryBook = () => {
  const CATALOG_ID_OF_STORY_BOOK = 9;

  const dispatch = useDispatch();

  const [storyBookInfos, setStoryBookInfos] = useState([]);
  const [isFetchedData, setIsFetchedData] = useState(false);

  const handleGetData = async () => {
    try {
      const response = await apiGetProductInfoByCatalogId(CATALOG_ID_OF_STORY_BOOK);
      setStoryBookInfos(response.data.response);
      setIsFetchedData(true);
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    handleGetData();
  }, [isFetchedData]);

  return (
    <div className={clsx(style.container)} data-aos="fade-up">
      <div className={clsx(style['heading-item'])}>
        <h2>Story Book</h2>
        <a>View all</a>
      </div>
      <div className={clsx(style['items-container'])}>
        {storyBookInfos.slice(0, 5).map((storyBookInfo, index) => (
          <div className="flex flex-wrap font-sans" key={index} id={clsx(style.item)}>
            <div className="flex-none w-48 relative">
              <img src={storyBookInfo.productImage} alt="" loading="lazy" className={clsx(style['story-book-img'])} />
            </div>
            <form className="flex-auto p-6">
              <div className="flex flex-wrap" id={clsx(style['product-name'])}>
                <h1 className="flex-auto text-lg font-semibold text-slate-900 ">
                  {storyBookInfo.productName}
                </h1>
              </div>
              <div className="text-lg font-semibold text-slate-500">
                Cost: {storyBookInfo.productCost}$
              </div>
              <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"></div>
              <div className="flex space-x-4 mb-6 text-sm font-medium">
                <div className="flex-auto flex space-x-4">
                  <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit" id={clsx(style['buy-button'])}>
                    Buy Now
                  </button>
                  <button className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button" id={clsx(style['add-to-cart-button'])}>
                    Add Cart
                  </button>
                </div>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoryBook;
