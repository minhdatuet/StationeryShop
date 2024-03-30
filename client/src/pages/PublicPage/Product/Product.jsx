import React, { useEffect, useState} from 'react'
import './Product.css'
import QuantityInput from '../../../components/QuantityInput/QuantityInput'
import { apiGetProductById } from '../../../services/product'

const Product = () => {
    const [product, setProduct] = useState({
        productName: 'Pen',
        catalogId: 1,
        productCost: 1000.0,
        productImage: 'https://m.media-amazon.com/images/I/71LbzzDezeL._AC_UF894,1000_QL80_.jpg',
        productQuantity: 1000,
        productDescription: 'This is beautiful pen',
      })
      const [quantity, setQuantity] = useState(null);
      const rates = [{
        userName: "Dat",
        rateScore: 5,
        productFeedback: "Good product"
      },
      {
        userName: "Duc",
        rateScore: 4,
        productFeedback: "Normal product"
      },
      {
        userName: "Dung",
        rateScore: 3,
        productFeedback: "Bad product"
      }];
      const handleQuantityChange = (value) => {
        setQuantity(value);
      };
      useEffect(() => {
        console.log(quantity)
      },[quantity])
      useEffect(() => {
        const productInfo = apiGetProductById(1);
        setProduct(productInfo);
        const fetchProduct = async () => {
            const id = 2;
            try {
              const response = await apiGetProductById(id);
              const data = response?.data.response;
              const err = response?.data.err;
              const msg = response?.data.msg;
              console.log(data);
              if (err === 0) {
                setProduct(data)
              }
            } catch (error) {
              console.error("Error fetching product:", error);
            }
          };
          fetchProduct();
      }, [])
    return(
        <div>
            <div id="product">
                <div className="image">
                    <img src={product.productImage} alt="" />
                </div>
                <div className="infor">
                    <div className="name">
                        {product.productName}
                    </div>
                    <div className="cost">
                        Price: {product.productCost} $
                    </div>
                    <div className="inventory">
                        Inventory: {product.productQuantity}
                    </div>
                    <div className="desc">
                        Description: {product.productDescription}
                    </div>
                    <div className="quantity">
                    <div>Quantity: </div>
                    <div id='quantityInput'><QuantityInput value={quantity} onChange={handleQuantityChange}/></div>
                    </div>
                    <div className="add-to-cart">
                        <button>
                            Add to cart
                        </button>
                    </div>
                    <div className="payment">
                        <button>
                            Buy it now
                        </button>
                    </div>
                </div>
            </div>
            <div id="rate">
                <div className="title">
                    Customer Reviews
                </div>
                <ul>
                    {rates.map((rate) => (
                        <>
                            <div className="user-name">{rate.userName}</div>
                            <div className="score">
                            {new Array(rate.rateScore).fill(null).map(() => (
                                <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                            ))}
                            {new Array(5 - rate.rateScore).fill(null).map(() => (
                                <svg class="w-4 h-4 mr-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                </svg>
                            ))}
                                
                            </div>
                            <div className="feedback">{rate.productFeedback}</div>
                        </>
                    ))}
                </ul>
            </div>
        </div>
        
    )
}

export default Product