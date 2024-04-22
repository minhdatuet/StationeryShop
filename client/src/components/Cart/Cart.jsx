import React, { useEffect, useState} from 'react'
import './Cart.css';
import { PiShoppingCartBold } from 'react-icons/pi';
import * as actions from '../../store/actions'
import { display } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux'
import { apiAddToCart, apiGetProductsInCart } from '../../services/product';
import NumberInput from '../QuantityInput/NumberInput';

const Cart = () => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);
    const { userData } = useSelector(state => state.user)
    const {cartData} = useSelector(state => state.cart)

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const [quantity, setQuantity] = useState(null);
      const handleQuantityChange = (value) => {
        setQuantity(value);
      };
      useEffect(() => {
        console.log(quantity)
      },[quantity])

    const [productsIncart, setProductsInCart] = useState([])

      useEffect(() => {
        const fetchProduct = async () => {
            try {
              const response = dispatch(actions.getCart(localStorage.getItem('id')));
                console.log(cartData)
            } catch (error) {
              console.error("Error fetching product:", error);
            }
          };
          fetchProduct();
      }, [quantity, userData])

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
    return (
        <>
            <div className="content">
                <div
                    className='cart-icon'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <PiShoppingCartBold size={40} />
                </div>
                {isHovered && (
                    <div className='cart-content' onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                        {/* Your cart content goes here */}
                        <ul>
                            {cartData?.map((product) => (
                                <li>
                                    <div className="product-image">
                                        <img src={product?.Product.productImage} alt="" />
                                    </div>
                                    <div className="product-content">
                                        <div className="product-name">{product?.Product.productName}</div>
                                        <div className="cost">{product?.Product.productCost} $</div>
                                        {/* <div className="quantity"><QuantityInput value={quantity} onChange={handleQuantityChange} startNum={product?.productsInCartQuantity} handleAdd={() => handleAddProduct(product?.Product.id, 1)}/></div> */}
                                        <NumberInput startNum={product?.productsInCartQuantity} handleAdd={() => handleAddProduct(product?.Product.id, 1) } handleRemove={() => handleAddProduct(product?.Product.id, -1)}/>
                                    </div>
                                    
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            
        </>
    );
};

export default Cart;
