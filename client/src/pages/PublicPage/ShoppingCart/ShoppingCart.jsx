import React, { useEffect, useState } from 'react'
import './ShoppingCart.css'
import * as actions from '../../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { apiAddToCart, apiGetProductsInCart } from '../../../services/product';
import NumberInput from '../../../components/QuantityInput/NumberInput'
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const { userData } = useSelector(state => state.user)
    const { cartData } = useSelector(state => state.cart)

    const [quantity, setQuantity] = useState(null);
    const handleQuantityChange = (value) => {
        setQuantity(value);
    };
    useEffect(() => {
        console.log(quantity)
    }, [quantity])

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
    }, [userData])

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

    const handlePayAll = () => {
        // console.log(cartData);
        navigate("/paymentCart?cartData=" + JSON.stringify(cartData));
    };

    return (
        <>
            <div className="sc">
                <div className="sc-title">Shopping Cart</div>
                <div className="sc-cart-content">
                    <ul>
                        {cartData.map((product) => (
                            <li>
                                <div className="sc-product-image">
                                    <img src={product?.Product.productImage} alt="" />
                                </div>
                                <div className="sc-product-content">
                                    <div className="sc-product-name">{product?.Product.productName}</div>
                                    <div className="sc-cost">{product?.Product.productCost} $</div>
                                    {/* <div className="quantity"><QuantityInput value={quantity} onChange={handleQuantityChange} startNum={product?.productsInCartQuantity} handleAdd={() => handleAddProduct(product?.Product.id, 1)}/></div> */}
                                    <NumberInput startNum={product?.productsInCartQuantity} handleAdd={() => handleAddProduct(product?.Product.id, 1)} handleRemove={() => handleAddProduct(product?.Product.id, -1)} />
                                </div>
                                <div className="sc-total-cost">
                                Total: {product?.Product.productCost * product?.productsInCartQuantity} $
                                </div>
                                <div className="sc-button">
                                    <div className="sc-pay"
                                    onClick={() => {
                                        navigate('/product/' + product?.Product.id)
                                    }}
                                    >Pay</div>
                                    <div className="sc-remove" onClick={() => handleAddProduct(product?.Product.id, -product?.productsInCartQuantity)}>Remove</div>
                                </div>
                            </li>
                        ))}
                        <div className="sc-costs">
                            <button
                                onClick={() => {
                                    handlePayAll();
                                }}
                            >Pay all</button>
                        </div>
                    </ul>
                </div>

            </div>

        </>
    );
};

export default ShoppingCart;
