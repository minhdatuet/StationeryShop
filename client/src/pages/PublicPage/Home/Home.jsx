import React, { useEffect } from 'react';
import style from './Home.module.scss';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as actions from '../../../store/actions';
import { apiAddToCart } from '../../../services/product';

function Home() {
  const { productData } = useSelector(state => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!productData.length) {
      dispatch(actions.getAllProducts());
    }
  }, [dispatch, productData]);

  // Tạo danh sách các danh mục
  const catalogs = [
    { id: 1, name: 'Backpack' },
    { id: 2, name: 'Book' },
    { id: 3, name: 'Casio' },
    { id: 4, name: 'Desklamp' },
    { id: 5, name: 'Notebook' },
    { id: 6, name: 'Pen' },
    { id: 7, name: 'School Supply' },
    { id: 8, name: 'Stationery Supply' },
    { id: 9, name: 'Story Book' },
    { id: 10, name: 'Table and Chair' }
  ];

  const handleViewAll = (catalog) => {
    navigate(`/productlist?category=${catalog.name}`);
  };

  const handleAddProduct = async (productId, productsInCartQuantity) => {
    try {
      const payload = {
        accountId: localStorage.getItem('id'),
        productId,
        productsInCartQuantity
      }
      console.log(payload)
      const response = await apiAddToCart(payload);
      dispatch(actions.getCart(localStorage.getItem('id')));
    } catch (error) {
      console.log('Add to cart error!');
    }
  };

  return (
    <>
      <div className={clsx(style.container)} data-aos="fade-up">
        {catalogs.map(catalog => {
          const filteredProducts = productData.filter(product => product.catalogId === catalog.id);
          return (
            <div key={catalog.id}>
              <div className={clsx(style['heading-item'])}>
                <h2>{catalog.name}</h2>
                <a onClick={() => handleViewAll(catalog)}>View all</a>
              </div>
              <div className={clsx(style['items-container'])}>
                {filteredProducts.slice(0, 5).map((product, index) => (
                  <Link
                    key={index}
                    className="flex flex-wrap font-sans"
                    id={clsx(style.item)}
                    to={`/product/${product.id}`}
                  >
                    <div>
                      <div className="flex-none w-48 relative">
                        <img
                          src={product.productImage}
                          alt={product.productName}
                          loading="lazy"
                          className={clsx(style['product-img'])}
                        />
                      </div>
                      <form className="flex-auto p-6">
                        <div className="flex flex-wrap" id={clsx(style['product-name'])}>
                          <h1 className="flex-auto text-lg font-semibold text-slate-900">
                            {product.productName}
                          </h1>
                        </div>
                        <div className="mt-1.5 text-lg font-semibold text-slate-500">
                          Cost: {product.productCost}$ 
                        </div>
                        <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"></div>
                        <div className="flex space-x-4 mb-6 text-sm font-medium">
                          <div className="flex-auto flex space-x-4">
                            <button
                              className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                              type="submit"
                              id={clsx(style['buy-button'])}
                            >
                              Buy Now
                            </button>
                            <button
                              className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
                              type="button"
                              id={clsx(style['add-to-cart-button'])}
                              onClick={(e) => {
                                e.preventDefault();
                                handleAddProduct(product.id, 1);
                              }}
                            >
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
