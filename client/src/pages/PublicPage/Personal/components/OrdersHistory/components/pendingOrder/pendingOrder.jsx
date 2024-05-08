
import { Fragment, useEffect, useState } from "react";
import { apiGetProductsInOrderByOId } from "../../../../../../../services/order";
import style from "./pendingOrder.module.scss";
import clsx from 'clsx';
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import DetailItem from "../detailItem/detailItem";

export const PendingOrder = (props) => {

    const [products, setProducts] = useState([]);
    const [isViewDetail, setIsViewDetail] = useState(false);

    const formattedDate = new Date(props.data.createdAt).toLocaleString('en-US', {
        timeZone: 'UTC',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
        });

    // console.log(props);
    const getProductsInOrder = async() => {
        try {
            const response = await apiGetProductsInOrderByOId(props.data.id);
            console.log(response);
            setProducts(response.data.response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProductsInOrder();
    }, [1]);
    
    return (
        <div className={clsx(style.container)}>
            <div className= {clsx(style.ovrContainer)}>
                <div className= {clsx(style.infoContainer)}>
                    <div className= {clsx(style.totalPrice)}>
                        <p>Total Price: {props.data.totalPrice}$</p>
                    </div>

                    <div className={clsx(style.dateInfo)}>
                        <p>Order Date: {formattedDate}</p> 
                        {/* Change format */}
                    </div>

                    <div className= {clsx(style.orderStatus)}>
                        <p>Order Status: {props.data.status}</p>
                    </div>
                </div>

                <div className= {clsx(style.viewDetail)}>
                    <div className={clsx(style.viewBtn, {[style.hide] : isViewDetail})}
                    onClick={() => {
                        setIsViewDetail(!isViewDetail);
                    }}
                    >
                        View Detail
                        <FaAngleDown></FaAngleDown>
                    </div>

                    <div className={clsx(style.viewGeneralBtn, {[style.hide] : !isViewDetail})}
                    onClick={() => {
                        setIsViewDetail(!isViewDetail);
                    }}
                    >
                        View General <FaAngleUp></FaAngleUp>
                    </div>
                </div>
            </div>

            <div className={clsx(style.productsInOrder, {[style.hide] : !isViewDetail})}>
                <div className={clsx(style.noAvailable, {[style.hide] : products.length !== 0})}>
                    <p>There is no item in this order</p>
                </div>
                {
                    products.map((product, index) => {
                        return (
                            <DetailItem key = {index} data = {product} />
                        );
                    })
                }
            </div>
        </div>
            
    )
};

export default PendingOrder;