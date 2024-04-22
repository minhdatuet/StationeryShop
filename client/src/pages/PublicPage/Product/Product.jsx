import React, { useEffect, useState} from 'react'
import './Product.css'
import { apiGetProductById, apiAddToCart } from '../../../services/product'
import NumberInput from '../../../components/QuantityInput/NumberInput'
import * as actions from '../../../store/actions'
import { useDispatch, useSelector } from 'react-redux'

const Product = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user)
    const {cartData} = useSelector(state => state.cart)
    const [product, setProduct] = useState({
        productName: '',
        catalogId: 0,
        productCost: 0,
        productImage: '',
        productQuantity: 0,
        productDescription: '',
      })
      const [quantity, setQuantity] = useState(1);
      const [rates, setRates] = useState([]);
      const handleQuantityChange = (value) => {
        setQuantity(value);
      };
      useEffect(() => {
        console.log(quantity)
      },[quantity])
      useEffect(() => {
        const fetchProduct = async () => {
            const id = 1;
            try {
              const response = await apiGetProductById(id);
              const data = response?.data.response;
              const err = response?.data.err;
              const msg = response?.data.msg;
              console.log(data);
              if (err === 0) {
                setProduct(data);
                setRates(data.Product_Rates);
              }
            } catch (error) {
              console.error("Error fetching product:", error);
            }
          };
          fetchProduct();
      }, [])

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
      }

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
                    {/* <div id='quantityInput'><QuantityInput value={quantity} onChange={handleQuantityChange} startNum={2}/></div> */}
                    <div id="quantityInput"><NumberInput startNum={quantity} handleAdd={() => setQuantity(quantity+1)} handleRemove={quantity > 1 ? () => setQuantity(quantity-1) : () => setQuantity(quantity)}/></div>
                    </div>
                    <div className="add-to-cart" onClick={() => handleAddProduct(product.id, quantity)}>
                        <button >
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
                            <div className="user-name">{rate.Account.accountName}</div>
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