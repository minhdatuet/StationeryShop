import React from "react";
import clsx from "clsx";
import style from "./RefundPolicy.module.scss";

const RefundPolicy = () => {
    return (
        <div className={clsx(style.container)}>
            <h1>Refund Policy</h1>
            <div className={clsx(style.concept)}>
                <ul>
                    <li>Refund for Incorrect or Damaged Goods: If you receive a product that does not match your order or if the product is damaged during transit, please contact us within 7 days of receiving the item.</li>
                    <li>Refund for Customer-Requested Returns: For cases where customers wish to return goods for personal reasons or are unsatisfied with the product, we will accept return requests within 30 days from the date of purchase. Customers are responsible for returning the product in its original condition and without damage.</li>
                    <li>Refund Procedure: To request a refund for goods, please contact us via the the information on our website. Upon receiving your request, we will review and process it promptly following our refund procedure.</li>
                </ul>
            </div>
        </div>
    )
}

export default RefundPolicy;
