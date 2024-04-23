import React, { useEffect, useState} from 'react'
import './Payment.css';
import { useDispatch, useSelector } from 'react-redux'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const Payment = ({productList}) => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);
    const { userData } = useSelector(state => state.user)
    
    return (
        <>
        <div className="sc">
                <div className="sc-title">Shopping Cart</div>
                <div className="sc-cart-content">
                    <ul>
                        {productList?.map((product) => (
                            <li>
                                <div className="sc-product-image">
                                    <img src={product?.Product.productImage} alt="" />
                                </div>
                                <div className="sc-product-content">
                                    <div className="sc-product-name">{product?.Product.productName}</div>
                                    <div className="sc-cost">{product?.Product.productCost} $</div>
                                    {/* <div className="quantity"><QuantityInput value={quantity} onChange={handleQuantityChange} startNum={product?.productsInCartQuantity} handleAdd={() => handleAddProduct(product?.Product.id, 1)}/></div> */}
                    
                                </div>
                                <div className="sc-total-cost">
                                Total: {product?.Product.productCost * product?.productsInCartQuantity} $
                                </div>
                                <div className="sc-button">
                                    <div className="sc-pay">Pay</div>
        
                                </div>
                            </li>
                        ))}
                        <div className="sc-costs">
                            <button>Pay all</button>
                        </div>
                    </ul>
                </div>

            </div>



        </>
    );
};

export default Payment;
