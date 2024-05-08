
import style from "./completedItem.module.scss";
import clsx from 'clsx';

export const CompletedItem = (props) => {
    
    return (
        <div className= {clsx(style.container)}>
            <div className={clsx(style.itemImg)}>
                <img src={props.data.Product.productImage} alt="" />
            </div>

            <div className={clsx(style.itemInfo)}>
                <div className={clsx(style.itemName)}>
                    <p>Name: {props.data.Product.productName}</p>
                </div>

                <div className={clsx(style.purchaseTime)}>
                    <p>Purchase Time: {props.data.quantity}</p>
                </div>
            </div>

            <div className={clsx(style.viewFeedback)}>
                <div className={clsx(style.viewFeedbackBtn)}>
                    View My Feedback
                </div>

                <div className={clsx(style.giveFeedbackBtn)}>
                    Give My Feedback
                </div>
            </div>
        </div>
    )
};

export default CompletedItem;