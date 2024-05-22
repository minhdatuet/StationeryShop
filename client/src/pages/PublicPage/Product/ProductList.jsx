import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as actions from '../../../store/actions';
import { apiAddToCart } from '../../../services/product';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const { productData } = useSelector(state => state.product);
  const { cartData } = useSelector(state => state.cart);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCategories, setShowCategories] = useState(true);
  const [priceFilter, setPriceFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const productsPerPage = 10;

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialCategory = query.get('category');
  const initialSearch = query.get('search');

  useEffect(() => {
    if (!productData.length) {
      dispatch(actions.getAllProducts());
    }
  }, [dispatch, productData]);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategories([initialCategory]);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  const handleAddProduct = async (productId, productsInCartQuantity) => {
    try {
      const payload = {
        accountId: localStorage.getItem('id'),
        productId,
        productsInCartQuantity
      };
      console.log(payload);
      const response = await apiAddToCart(payload);
      dispatch(actions.getCart(localStorage.getItem('id')));
    } catch (error) {
      console.log('Add to cart error!', error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prevSelectedCategories =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter(c => c !== category)
        : [...prevSelectedCategories, category]
    );
    setCurrentPage(1);
  };

  const handlePriceFilterChange = (filter) => {
    setPriceFilter(filter);
  };

  let filteredProducts = productData.filter(product =>
    (selectedCategories.length === 0 || selectedCategories.includes(product.Catalog.catalogName)) &&
    (!searchQuery || product.productName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (priceFilter) {
    filteredProducts = filteredProducts.sort((a, b) => {
      if (priceFilter === 'asc') {
        return a.productCost - b.productCost;
      } else if (priceFilter === 'desc') {
        return b.productCost - a.productCost;
      }
      return 0;
    });
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? 'active' : ''}
          >
            {i}
          </button>
        );
      }
    } else {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={currentPage === 1 ? 'active' : ''}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        pages.push(<span key="dots1">...</span>);
      }

      if (currentPage > 2) {
        pages.push(
          <button
            key={currentPage - 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className=""
          >
            {currentPage - 1}
          </button>
        );
      }

      if (currentPage !== 1 && currentPage !== totalPages) {
        pages.push(
          <button
            key={currentPage}
            onClick={() => handlePageChange(currentPage)}
            className="active"
          >
            {currentPage}
          </button>
        );
      }

      if (currentPage < totalPages - 1) {
        pages.push(
          <button
            key={currentPage + 1}
            onClick={() => handlePageChange(currentPage + 1)}
            className=""
          >
            {currentPage + 1}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(<span key="dots2">...</span>);
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={currentPage === totalPages ? 'active' : ''}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <>
      <div className="product-list-container">
        <div className="filter-section">
          <h2 onClick={() => setShowCategories(!showCategories)}>
            Filter by Category 
            <span className="toggle-icon">{showCategories ? '▲' : '▼'}</span>
          </h2>
          {showCategories && (
            <>
              <div className="filter-categories">
                {['Backpack', 'Book', 'Casio', 'Desk Lamp', 'Notebook', 'Pen', 'School Supply', 'Stationery Supply', 'Story Book', 'Table and Chair'].map(category => (
                  <label key={category} className="category-label">
                    <input
                      type="checkbox"
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    {category}
                  </label>
                ))}
              </div>
            </>
          )}
          <div className="filter-price">
            <h3>Filter by Price</h3>
            <label>
              <input
                type="radio"
                name="price"
                value="asc"
                checked={priceFilter === 'asc'}
                onChange={() => handlePriceFilterChange('asc')}
              />
              Increase
            </label>
            <label>
              <input
                type="radio"
                name="price"
                value="desc"
                checked={priceFilter === 'desc'}
                onChange={() => handlePriceFilterChange('desc')}
              />
              Decrease
            </label>
          </div>
        </div>
        <div className="product-list">
          {currentProducts.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.productImage} alt={product.productName} />
              </div>
              <div className="product-info">
                <h3>{product.productName}</h3>
                <p className="product-price">{product.productCost} $</p>
                <p className="product-description">{product.productDescription}</p>
              </div>
              <button 
                className="add-to-cart-btn" 
                onClick={() => handleAddProduct(product.id, 1)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {renderPagination()}
        <button
          onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </>
  );
};

export default ProductList;
