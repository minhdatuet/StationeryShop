import React, { useEffect, useState } from 'react'
import './Payment.css';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import * as actions from '../../store/actions';
import { apiHandleWhenCustomerClickPayNow, apiAddToProductInOrder } from '../../services/order';
import { apiGetPaymentLinkInfomation, apiCreatePaymentLink, apiVerifyPaymentWebhookData } from '../../services/payos';

const Payment = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);
    const { userData } = useSelector(state => state.user)
    const { cartData } = useSelector(state => state.cart)
    const [productListFromCart, setProductListCart] = useState([]);
    const [totalPayFromCart, setTotalPayFromCart] = useState(0)

    const [productListFromHomePage, setProductListFromHomePage] = useState([{
        id: 0,
    }]);
    const [totalPayFromHomePage, setTotalPayFromHomePage] = useState(0)

    const { product, quantity } = location.state || {};

    useEffect(() => {
        if (product && quantity) {
            setProductListFromHomePage([product]);
            setTotalPayFromHomePage(quantity * product.productCost);
        }
    }, [product, quantity]);
    console.log(productListFromHomePage[0].id, quantity);
    console.log(totalPayFromHomePage);
    console.log(localStorage);

    const checkCancel = async () => {
        let url = new URL(window.location.href);
        const orderCode = url.searchParams.get('orderCode');
        if (orderCode) {
            const response1 = await apiGetPaymentLinkInfomation(orderCode);
            console.log(response1);
            if(response1.status === 200) {
                setTotalPayFromHomePage((response1.data.data.amount)/100 - 5);
            }
        }
    }

    useEffect(() => {
        checkCancel()
    }, [0]);
    

    const handleClickPayNow = async () => {
        try {
            let orderCode = Date.now();
            const productInOrderHomePage = [{
                productId: productListFromHomePage[0].id,
                productsInCartQuantity: quantity
            }]
            // console.log(JSON.stringify(productInOrderHomePage));
            // alert();
            const orderTest = {
                orderCode: orderCode,
                amount: (totalPayFromHomePage + 5) * 100,
                description: "Thanh toan don hang",
                items: [
                    {
                        name: "Mì tôm hảo hảo ly",
                        quantity: quantity,
                        price: (totalPayFromHomePage + 5) * 100,
                    }
                ],
                cancelUrl: "http://localhost:3000/payment",
                returnUrl: "http://localhost:3000/personal?checkPayment=true&orderId=" + orderCode + "&productsInOrder=" + JSON.stringify(productInOrderHomePage),
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
            
            <div className='p-PayBtn'>
                <div className=""
                onClick={handleClickPayNow}
                >
                    <button >
                        Pay now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
