import { Fragment, useEffect, useState } from "react";
import Sidebar from "./components/SideBar/SideBar";
import clsx from 'clsx';
import style from './Personal.module.scss'
import Information from "./components/Information/Information";
import History from "./components/OrdersHistory/History";
import { apiGetDetailInfoByID } from "../../../services/user";
import { apiGetPaymentLinkInfomation } from "../../../services/payos";
import { apiAddToProductInOrder, apiHandleWhenCustomerClickPayNow } from "../../../services/order";
import { apiAddToCart } from "../../../services/product";
import { useDispatch } from "react-redux";
import * as actions from '../../../store/actions';

export const Personal = () => {

    const accId = localStorage.getItem('id');
    const dispatch = useDispatch();
    // console.log(localStorage);

    const [pState, setPState] = useState({
        isInformationPage: true,
        isHistoryPage: false
    });

    const clickInformationPage = () => {
        // console.log(1);
        // getInformationData();
        setPState({
            isInformationPage: true,
            isHistoryPage: false
        });
    };

    const clickHistoryPage = () => {
        // console.log(2);
        setPState({
            isInformationPage: false,
            isHistoryPage: true
        })
    }

    const checkPayment = async () => {
        let url = new URL(window.location.href);
        const isCheck = url.searchParams.get('checkPayment');
        console.log(isCheck);
        if (isCheck) {
            console.log(url.searchParams.get('checkPayment'));
            const orderId = url.searchParams.get('orderId');
            const productsInOrder = JSON.parse(url.searchParams.get('productsInOrder'));
            console.log(productsInOrder);
            console.log(productsInOrder.length);
            console.log(productsInOrder[0].quantity);
            const response1 = await apiGetPaymentLinkInfomation(orderId);
            console.log(response1);

            if (response1.status === 200) {
                if (response1.data.data.status === "PAID") {
                    const payloadAPIiHandleWhenCustomerClickPayNow = {
                        status: "WAITING",
                        totalPrice: response1.data.data.amount,
                        accountId: localStorage.id
                    }

                    const response2 = await apiHandleWhenCustomerClickPayNow(payloadAPIiHandleWhenCustomerClickPayNow);
                    console.log(response2);

                    for (let i = 0; i < productsInOrder.length; i++) {
                        const payloadAPIAddToProductInOrder = {
                            productId: productsInOrder[i].productId,
                            orderId: response2.data.id,
                            quantity: productsInOrder[i].productsInCartQuantity
                        }
                        console.log(payloadAPIAddToProductInOrder);
                        await apiAddToProductInOrder(payloadAPIAddToProductInOrder);
                    }
                }
            }
        }
    };



    useEffect(() => {
        checkPayment();
    }, [0])
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

    return (
        <Fragment>
            <div className={clsx(style.container)}>
                <div className={clsx(style.sidebarContainer)}>
                    <Sidebar func={
                        { clickHistoryPage, clickInformationPage }
                    } />
                </div>

                <div className={clsx(style.contentContainer)}>
                    <div className={clsx(style.informationPageContainer, { [style.hidden]: !pState.isInformationPage })}>
                        <Information pData={accId} />
                    </div>

                    <div className={clsx(style.historyPageContainer, { [style.hidden]: !pState.isHistoryPage })}>
                        <History />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Personal;