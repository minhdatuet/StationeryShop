import React, { useEffect, useState } from 'react'
import './Payment.css';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import * as actions from '../../store/actions';
import { apiHandleWhenCustomerClickPayNow, apiAddToProductInOrder } from '../../services/order';
import { apiGetPaymentLinkInfomation, apiCreatePaymentLink, apiVerifyPaymentWebhookData } from '../../services/payos';

const PaymentCart = () => {
    
    const { userData } = useSelector(state => state.user)
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPay, setTotalPay] = useState(0)

    
    const checkCancel = async () => {
        let url = new URL(window.location.href);
        const orderCode = url.searchParams.get('orderCode');
        if (orderCode) {
            const response1 = await apiGetPaymentLinkInfomation(orderCode);
            console.log(response1);
            if(response1.status === 200) {
                setTotalPay((response1.data.data.amount)/100 - 5);
            }
        }
    }

    useEffect(() => {
        checkCancel()
    }, [0]);
    
    useEffect(() => {
        const cartData = JSON.parse(new URL(window.location.href).searchParams.get('cartData'));
        // console.log(cartProducts);
        setCartProducts(cartData);
        let total = 0
        for(let i = 0; i < cartData.length; i++) {
            total += cartData[i].Product.productCost * cartData[i].productsInCartQuantity
        }
        setTotalPay(total);

    }, [0])

    const handleClickPayNow = async () => {
        try {
            let orderCode = Date.now();
            // alert();
            const orderTest = {
                orderCode: orderCode,
                amount: (totalPay + 5) * 100,
                description: "Thanh toan don hang",
                items: [
                    {
                        name: "Mì tôm hảo hảo ly",
                        // quantity: quantity,
                        price: (totalPay + 5) * 100,
                    }
                ],
                cancelUrl: "http://localhost:3000/payment",
                returnUrl: "http://localhost:3000/personal?checkPayment=true&orderId=" + orderCode + "&productsInOrder=" + JSON.stringify(cartProducts),
            };
            const responseCreatePaymentLink = await apiCreatePaymentLink(orderTest);
            console.log(responseCreatePaymentLink);
            window.location.href = responseCreatePaymentLink.data.data.checkoutUrl;

            // const responseGetPaymentLinkInfomation = await apiGetPaymentLinkInfomation(orderId);
            // console.log(responseGetPaymentLinkInfomation);

            // const responseVerifyPaymentWebhookData = await apiVerifyPaymentWebhookData(responseCreatePaymentLink.data.data.checkoutUrl);
            // console.log(responseVerifyPaymentWebhookData);

        } catch (error) {
            console.error("Payment error:", error);
        }
    }

    

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
            <div className='p-PayBtn'>
                <div className="">
                    <button 
                    onClick={handleClickPayNow}
                    >
                        Pay now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentCart;
