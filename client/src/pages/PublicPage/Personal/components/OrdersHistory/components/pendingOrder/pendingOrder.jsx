
import { useEffect, useState } from "react";
import { apiGetProductsInOrderByOId } from "../../../../../../../services/order";
import style from "./pendingOrder.module.scss";
import clsx from 'clsx';
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";

export const PendingOrder = (props) => {

    const [products, setProducts] = useState([]);
    const [isViewDetail, setIsViewDetail] = useState(false);

    // console.log(props);
    const getProductsInOrder = async() => {
        try {
            const response = await apiGetProductsInOrderByOId(props.data.id);
            // console.log(response);
            setProducts(response.data.response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductsInOrder();
    }, [1]);
    
    return (
        <div className= {clsx(style.container)}>
            <div className= {clsx(style.infoContainer)}>
                <div className= {clsx(style.totalPrice)}>
                    <p>Total Price: {props.data.totalPrice}$</p>
                </div>

                <div className={clsx(style.dateInfo)}>
                    <p>Order Date: {props.data.createdAt}</p> 
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
    )
};

export default PendingOrder;