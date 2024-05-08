
import { useEffect, useState } from "react";
import style from "./detailItem.module.scss";
import clsx from 'clsx';

export const DetailItem = (props) => {
    console.log(props);
    return (
        <div className= {clsx(style.container)}>
            <div className={clsx(style.itemImg)}>
                <img src={props.data.Product.productImage} alt="" />
            </div>

            <div className={clsx(style.itemInfo)}>
                <div className={clsx(style.itemName)}>
                    <p>Name: {props.data.Product.productName}</p>
                </div>

                <div className={clsx(style.itemQuantity)}>
                    <p>Quantity: {props.data.quantity}</p>
                </div>
            </div>

            <div className={clsx(style.viewDetailItem)}>
                <div className={clsx(style.viewDetailItemBtn)}>
                    Detail
                </div>
            </div>
        </div>
    )
};

export default DetailItem;