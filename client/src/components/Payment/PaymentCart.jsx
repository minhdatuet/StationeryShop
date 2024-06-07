import React, { useEffect, useState } from 'react'
import './Payment.css';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import * as actions from '../../store/actions';
import { apiHandleWhenCustomerClickPayNow, apiAddToProductInOrder } from '../../services/order';
import { apiGetPaymentLinkInfomation, apiCreatePaymentLink, apiVerifyPaymentWebhookData } from '../../services/payos';
import { apiCreateCheckoutSession, apiRetrieveASession } from '../../services/stripe';

const PaymentCart = () => {
    
    const { userData } = useSelector(state => state.user)
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPay, setTotalPay] = useState(0)

    const checkCancel = async () => {
        let url = new URL(window.location.href);
        const orderCode = url.searchParams.get('orderCode');
        const checkSuccessWithCard = url.searchParams.get('checkSuccessWithCard');
    
        if (orderCode) {
            const response1 = await apiGetPaymentLinkInfomation(orderCode);
            console.log(response1);
            if (response1.status === 200) {
                setTotalPay((response1.data.data.amount) / 100 - 5);
            }
        }
    
        if (checkSuccessWithCard === "false") {
            const sessionId = url.searchParams.get('sessionId');
            if (sessionId) {
                const response = await apiRetrieveASession(sessionId);
                setTotalPay(response.data.amount_total);
            }
        }
    };

    useEffect(() => {
        checkCancel()
    }, [0]);
    
    useEffect(() => {
        const cartData = JSON.parse(new URL(window.location.href).searchParams.get('cartData'));
        setCartProducts(cartData);
        console.log(cartData);
        let total = 0
        for (let i = 0; i < cartData.length; i++) {
            console.log(cartData[i].Product.productCost);
            console.log(cartData[i].productsInCartQuantity);
            total += cartData[i].Product.productCost * cartData[i].productsInCartQuantity
        }
        console.log(total);
        setTotalPay(total);

    }, [0])

    const handleClickPayByQR = async () => {
        try {
            let orderCode = Date.now();
            const orderTest = {
                orderCode: orderCode,
                amount: (totalPay + 5) * 100,
                description: "Thanh toan don hang",
                items: [
                    {
                        name: "Mì tôm hảo hảo ly",
                        price: (totalPay + 5) * 100,
                    }
                ],
                cancelUrl: "http://localhost:3000/payment",
                returnUrl: "http://localhost:3000/personal?checkPayment=true&orderId=" + orderCode + "&productsInOrder=" + JSON.stringify(cartProducts),
            };
            const responseCreatePaymentLink = await apiCreatePaymentLink(orderTest);
            console.log(responseCreatePaymentLink);
            window.location.href = responseCreatePaymentLink.data.data.checkoutUrl;

        } catch (error) {
            console.error("Payment error:", error);
        }
    }

    const handleClickPayByCard = async () => {
        sessionStorage.setItem('productsInOrder', JSON.stringify(cartProducts));
        const successUrl = "http://localhost:3000/personal?checkSuccessWithCard=true&sessionId={CHECKOUT_SESSION_ID}";
        const cancelUrl = "http://localhost:3000/payment?checkSuccessWithCard=false&sessionId={CHECKOUT_SESSION_ID}";

        const session = {
            name: "Pay for those items", 
            amount: totalPay,
            success_url: successUrl,
            cancel_url: cancelUrl
        }
        
        const response = await apiCreateCheckoutSession(session);
        console.log(response);
    
        window.location.href = response.data.url;
    };

    return (
        <div className="pay">
            <div className="sc-title">Payment</div>
            <div className="p-address">
                <div className="content-address">Your Address: {userData.accountAddress}</div>
            </div>
            <div className="p-cost">
                <div className="p-cost-txt">
                    <div className="p-product-cost-txt">Total amount due for selected items:</div>
                    <div className="p-deliver-cost-txt">Shipping cost:</div>
                    <div className="p-total-cost-txt">Total:</div>
                </div>
                <div className="p-cost-value">
                    <div className="p-product-cost-value">{totalPay}$</div>
                    <div className="p-deliver-cost-value">5$</div>
                    <div className="p-total-cost-value">{totalPay + 5}$</div>
                </div>
            </div>

            <div class='p-PayBtn'>
                <div class="pay-option" >
                    <button 
                        class="pay-button"
                        onClick={handleClickPayByQR}
                    >
                        Pay By QR
                    </button>
                </div>

                <div class="pay-option">
                    <button 
                        class="pay-button"
                        onClick={handleClickPayByCard}
                    >
                        Pay By Card
                    </button>
                </div>
            </div>

        </div>
    );
};

export default PaymentCart;
