import React, { useEffect, useState} from 'react'
import './Payment.css';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import * as actions from '../../store/actions';
import { apiHandleWhenCustomerClickPayNow, apiAddToProductInOrder } from '../../services/order';

const Payment = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);
    const { userData } = useSelector(state => state.user)
    const { cartData } = useSelector(state => state.cart)
    const [productListFromCart, setProductListCart] = useState([]);
    const [totalPayFromCart, setTotalPayFromCart] = useState(0)

    const [productListFromHomePage, setProductListFromHomePage] = useState([]);
    const [totalPayFromHomePage, setTotalPayFromHomePage] = useState(0)

    const { product, quantity } = location.state || {};

    useEffect(() => {
        if (product && quantity) {
            setProductListFromHomePage([product]);
            setTotalPayFromHomePage(quantity * product.productCost);
        }
    }, [product, quantity]);
    console.log(productListFromHomePage);
    console.log(totalPayFromHomePage);
    console.log(localStorage);

    const handleClickPayNow = async () => {
        const payloadAPIiHandleWhenCustomerClickPayNow = {
            status: "WAITING",
            totalPrice: totalPayFromHomePage,
            accountId: localStorage.id
        }
        try {
            const response = await apiHandleWhenCustomerClickPayNow(payloadAPIiHandleWhenCustomerClickPayNow);
            console.log(response);
            if (response && response.data) {
                const orderId = response.data.id;
                const payloadAPIAddToProductInOrder = {
                    productId: productListFromHomePage[0].id,
                    orderId: orderId,
                    quantity: quantity
                }
                await apiAddToProductInOrder(payloadAPIAddToProductInOrder);
            }
        } catch (error) {
            console.error("Payment error:", error);
        }
    }
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const responseCart = dispatch(actions.getCart(localStorage.getItem('id')));
                const responseUser = dispatch(actions.getUser())
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
        console.log(userData);
    }, []);

    useEffect(() => {
        setProductListCart(cartData)
        var pay = 0;
        for (var i = 0; i < cartData.length; i++) {
            console.log(cartData[i])
            pay += parseInt(cartData[i].Product.productCost) * parseInt(cartData[i].productsInCartQuantity);
            
        }
        setTotalPayFromCart(pay)
    }, [cartData]);

    return (
        <div className="pay">
            <div className="sc-title">Payment</div>
            <div className="p-address">
                <div className="content-address">Your Address: {userData.accountAddress}</div>
                <button className="change-address">Change</button>
            </div>
            <div className="p-cost">
                <div className="p-cost-txt">
                    <div className="p-product-cost-txt">Total amount due for selected items:</div>
                    <div className="p-deliver-cost-txt">Shipping cost:</div>
                    <div className="p-total-cost-txt">Total:</div>
                </div>
                <div className="p-cost-value">
                    <div className="p-product-cost-value">{totalPayFromHomePage}$</div>
                    <div className="p-deliver-cost-value">5$</div>
                    <div className="p-total-cost-value">{totalPayFromHomePage + 5}$</div>
                </div>
            </div>
            <div className="pay-title">Choose your payment method:</div>
            <div className='method-list'>
                <div className="">
                    <button onClick={handleClickPayNow}>
                        Pay now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
