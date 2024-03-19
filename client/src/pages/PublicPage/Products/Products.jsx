import React, { useEffect, useState } from 'react';
import style from './Products.module.scss';
import Product from './Product/Product';
import clsx from 'clsx';

export const Products = () => {

  const [productsList, setProductsList] = useState([]);

  const getProductsList = () => {
    // Test
    setProductsList(
      [
        {
          productId: 1,
          productName: "Pen 1",
          productPrice: 1,
          productImg: "https://scooboo.in/cdn/shop/products/kaco-tecflow-05mm-roller-gel-pen-gel-pens-scooboo-725290.jpg?v=1691238154&width=1080",
          productQuantity: 10,
          productDescription: "No",
          productRvs: 1,
          productScore: 4.5
        },
        {
          productId: 2,
          productName: "Pen 2",
          productPrice: 2,
          productImg: "https://scooboo.in/cdn/shop/products/kaco-tecflow-05mm-roller-gel-pen-gel-pens-scooboo-725290.jpg?v=1691238154&width=1080",
          productQuantity: 10,
          productDescription: "No",
          productRvs: 11,
          productScore: 5
        },
        {
          productId: 3,
          productName: "Pen 3",
          productPrice: 3,
          productImg: "https://scooboo.in/cdn/shop/products/kaco-tecflow-05mm-roller-gel-pen-gel-pens-scooboo-725290.jpg?v=1691238154&width=1080",
          productQuantity: 10,
          productDescription: "No",
          productRvs: 11,
          productScore: 5
        },
        {
          productId: 4,
          productName: "Pen 4",
          productPrice: 4,
          productImg: "https://scooboo.in/cdn/shop/products/kaco-tecflow-05mm-roller-gel-pen-gel-pens-scooboo-725290.jpg?v=1691238154&width=1080",
          productQuantity: 10,
          productDescription: "No",
          productRvs: 11,
          productScore: 5
        }
      ]
    );
  }

  useEffect(() => {
    getProductsList();
  }, [0]);

  return (
    <div className={clsx(style.pageContainer)}>
      <div className={clsx(style.productsListHeader, )}>
        <div className={clsx(style.productsListName, )}>
            <p>Kaco Premium Collection</p>
        </div>
      </div>

      <div className={clsx(style.productsListBody, )}>
        <div className={clsx(style.sortOption, )}>
            <div className={clsx(style.sortByBestSelling, )}>
                <p>Sort By Best Selling</p>
            </div>

            <div className={clsx(style.sortByAZ, )}>
                <p>Sort By A-Z</p>
            </div>

            <div className={clsx(style.sortByZA, )}>
                <p>Sort By Z-A</p>
            </div>

            <div className={clsx(style.sortByPriceDes, )}>
              <p>Sort  By Price Descending</p>
            </div>

            <div className={clsx(style.sortByPriceAsc, )}>
              <p>Sort By Price Ascending</p>
            </div>
        </div>

        <div className={clsx(style.ProductsInfo, )}>
          <div className={clsx(style.listHeader, )}>
            <div className={clsx(style.productsQuantity, )}>
              <p>{productsList.length} {productsList.length > 1 ? "products" : "product"}</p>
            </div>
            <div className={clsx(style.viewFeature, )}></div>
          </div>

          {
            productsList.map((product, index) => {
              return (
                <Product data={product} key={index} />
              );
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Products
