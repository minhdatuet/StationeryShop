import React, { Fragment, useEffect, useState } from 'react';
import style from './Products.module.scss';
import Product from './Product/Product';
import clsx from 'clsx';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import { apiGetAllProductInfoByCatalogId, apiGetProductInfoByCatalogId } from '../../../services/product';

let tmpArray =[];

export const Products = () => {

  const [productsList, setProductsList] = useState([]);
  const [productsRenderList, setProductsRenderList] = useState([]);
  
  const [sortOption, setSortOption] = useState("0");
  const [rerenderAfterSort, setRerenderAfterSort] = useState(true);

  const location = useLocation();
  const catalogId = new URLSearchParams(location.search).get("catalogId");
  const catalogName = new URLSearchParams(location.search).get("catalogName");

  const getProductsList = async() => {

    try {
      const response = await apiGetAllProductInfoByCatalogId(catalogId);
      console.log(response.data.response);
      setProductsList(response.data.response);
    } 
    catch (error) {
      console.error(error);
    }
    // Test
    // setProductsList(
    //   [
    //     {
    //       productId: 1,
    //       productName: "Pen 1",
    //       productPrice: 1,
    //       productImg: "https://scooboo.in/cdn/shop/products/kaco-tecflow-05mm-roller-gel-pen-gel-pens-scooboo-725290.jpg?v=1691238154&width=1080",
    //       productQuantity: 10,
    //       productDescription: "No",
    //       productRvs: 1,
    //       productScore: 4.5
    //     },
    //     {
    //       productId: 2,
    //       productName: "Pen 2",
    //       productPrice: 2,
    //       productImg: "https://scooboo.in/cdn/shop/products/kaco-tecflow-05mm-roller-gel-pen-gel-pens-scooboo-725290.jpg?v=1691238154&width=1080",
    //       productQuantity: 10,
    //       productDescription: "No",
    //       productRvs: 11,
    //       productScore: 5
    //     },
    //     {
    //       productId: 3,
    //       productName: "Pen 3",
    //       productPrice: 3,
    //       productImg: "https://scooboo.in/cdn/shop/products/kaco-tecflow-05mm-roller-gel-pen-gel-pens-scooboo-725290.jpg?v=1691238154&width=1080",
    //       productQuantity: 10,
    //       productDescription: "No",
    //       productRvs: 11,
    //       productScore: 5
    //     },
    //     {
    //       productId: 4,
    //       productName: "Pen 4",
    //       productPrice: 4,
    //       productImg: "https://raw.githubusercontent.com/TDungx2k3/Magic_Post/main/frontend/src/assets/images/serviceBg.jpg",
    //       productQuantity: 10,
    //       productDescription: "No",
    //       productRvs: 11,
    //       productScore: 5
    //     }
    //   ]
    // );
  };

  const updateProductsRender = () => {
    console.log(sortOption);
    console.log(tmpArray);

    if(sortOption === "0") {
      setProductsRenderList(productsList);
    }
    else {
      
      tmpArray = productsList;
      if(sortOption === "Sort By Best Selling") {
        for(let i = 0; i < tmpArray.length; i++) {
          for(let j = i + 1; j < tmpArray.length; j++) {
            if(tmpArray[j].Product_Rates.length > tmpArray[i].Product_Rates.length
              || ((tmpArray[j].Product_Rates.length != 0 && tmpArray[i].Product_Rates.length != 0)
              && tmpArray[j].Product_Rates[0].productRvs > tmpArray[i].Product_Rates[0].productRvs)) {
              let tempObj = tmpArray[i];
              tmpArray[i] = tmpArray[j];
              tmpArray[j] = tempObj;
            }
          }
        }
      }
      else if(sortOption === "Sort By A-Z") {
        for(let i = 0; i < tmpArray.length; i++) {
          for(let j = i + 1; j < tmpArray.length; j++) {
            if(tmpArray[j].productName < tmpArray[i].productName) {
              let tempObj = tmpArray[i];
              tmpArray[i] = tmpArray[j];
              tmpArray[j] = tempObj;
            }
          }
        }
      }
      else if(sortOption === "Sort By Z-A") {
        for(let i = 0; i < tmpArray.length; i++) {
          for(let j = i + 1; j < tmpArray.length; j++) {
            if(tmpArray[j].productName > tmpArray[i].productName) {
              let tempObj = tmpArray[i];
              tmpArray[i] = tmpArray[j];
              tmpArray[j] = tempObj;
            }
          }
        }
      }
      else if(sortOption === "Sort By Price Descending") {
        for(let i = 0; i < tmpArray.length; i++) {
          for(let j = i + 1; j < tmpArray.length; j++) {
            if(tmpArray[j].productCost > tmpArray[i].productCost) {
              let tempObj = tmpArray[i];
              tmpArray[i] = tmpArray[j];
              tmpArray[j] = tempObj;
            }
          }
        }
      }
      else if(sortOption === "Sort By Price Ascending") {
        for(let i = 0; i < tmpArray.length; i++) {
          for(let j = i + 1; j < tmpArray.length; j++) {
            if(tmpArray[j].productCost < tmpArray[i].productCost) {
              let tempObj = tmpArray[i];
              tmpArray[i] = tmpArray[j];
              tmpArray[j] = tempObj;
            }
          }
        }
      }
      console.log(tmpArray);
      setProductsRenderList(tmpArray);
      setRerenderAfterSort(!rerenderAfterSort);
    }
  };

  useEffect(() => {
    getProductsList();
  }, [0]);

  useEffect(() => {
    updateProductsRender();
  }, [sortOption, productsList]);

  useEffect(() => {
    setProductsRenderList(tmpArray);
  }, [rerenderAfterSort])

  return (

    <Fragment>
      <div className={clsx(style.pageContainer)}>
        <div className={clsx(style.productsListHeader, )}>
          <div className={clsx(style.productsListName, )}>
              <p>{catalogName}</p>
          </div>
        </div>

        <div className={clsx(style.productsListBody, )}>
          <div className={clsx(style.sortOption, )}>
              <div className={clsx(style.sortByBestSelling, )}
              onClick={() => {
                setSortOption("Sort By Best Selling");
              }}
              >
                  <p>Sort By Best Selling</p>
              </div>

              <div className={clsx(style.sortByAZ, )}
              onClick={() => {
                setSortOption("Sort By A-Z");
              }}
              >
                  <p>Sort By A-Z</p>
              </div>

              <div className={clsx(style.sortByZA, )}
              onClick={() => {
                setSortOption("Sort By Z-A");
              }}
              >
                  <p>Sort By Z-A</p>
              </div>

              <div className={clsx(style.sortByPriceDes, )}
              onClick={() => {
                setSortOption("Sort By Price Descending");
              }}
              >
                <p>Sort By Price Descending</p>
              </div>

              <div className={clsx(style.sortByPriceAsc, )}
              onClick={() => {
                setSortOption("Sort By Price Ascending");
              }}
              >
                <p>Sort By Price Ascending</p>
              </div>
          </div>

          <div className={clsx(style.ProductsInfo, )}>
            <div className={clsx(style.listHeader, )}>
              <div className={clsx(style.productsQuantity, )}>
                <p>{productsRenderList.length} {productsRenderList.length > 1 ? "products" : "product"}</p>
              </div>
              <div className={clsx(style.viewFeature, )}></div>
            </div>

            {
              productsRenderList.map((product, index) => {
                return (
                  <Product data={product} key={index} />
                );
              })
            }
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
    
  )
}

export default Products
