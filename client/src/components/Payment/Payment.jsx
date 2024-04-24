import React, { useEffect, useState} from 'react'
import './Payment.css';
import { useDispatch, useSelector } from 'react-redux'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import * as actions from '../../store/actions'

const Payment = () => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);
    const { userData } = useSelector(state => state.user)
    const { cartData } = useSelector(state => state.cart)
    const [productList, setProductList] = useState([])
    const [totalPay, setTotalPay] = useState(0)
    
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
    }, [])
    useEffect(() => {
        setProductList(cartData)
        var pay = 0;
        for (var i = 0; i < cartData.length; i++) {
            console.log(cartData[i])
            pay += parseInt(cartData[i].Product.productCost) * parseInt(cartData[i].productsInCartQuantity);
            
        }
        setTotalPay(pay)
    }, [cartData])
    return (
        <>
        <div className="pay">
                
                <div className="sc-title">Payment</div>
                <div className="p-address">
                    <div className="content-address">
                        Your Address: {userData.accountAddress}
                    </div>
                    <button className="change-address">
                        Change
                    </button>
                </div>
                <div className="p-cost">
                    <div className="p-cost-txt">
                        <div className="p-product-cost-txt">Total amount due for selected items:</div>
                        <div className="p-deliver-cost-txt">Shipping cost:</div>
                        <div className="p-total-cost-txt">Total:</div>
                    </div>
                    <div className="p-cost-value">
                        <div className="p-product-cost-value">{totalPay}$</div>
                        <div className="p-deliver-cost-value">5$ </div>
                        <div className="p-total-cost-value">{totalPay + 5}$</div>
                    </div>
                </div>
                
                <div className="pay-title">Choose your payment method:</div>
                <div className='method-list'>
                    <div className=""><button><img src="https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN3FlUFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--d4d53d6da965f8d0f8483d9501a7a5c6495477e6/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFJc0FXa0NMQUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--15c3f2f3e11927673ae52b71712c1f66a7a1b7bd/logo%20d%E1%BB%8Dc.png" alt="" /></button> Pay by VNPAY</div>
                    <div className=""><button><img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="" /></button> Pay by Momo</div>
                    <div className="cod-method">COD</div>
                </div>
                
                </div>




        </>
    );
};

export default Payment;
