
import style from "./completedItem.module.scss";
import clsx from 'clsx';
import { useNavigate } from "react-router-dom";

export const CompletedItem = (props) => {
    console.log(props.data);

    const navigate = useNavigate()
    const formattedDate = new Date(props.data.purchaseTime).toLocaleString('en-US', {
    timeZone: 'UTC',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
    });
    return (
        <div className= {clsx(style.container, {[style.hidden] : props.data.Product_In_Order == null})}>
            <div className={clsx(style.itemImg)}>
                <img src={props.data.Product_In_Order == null ? null : props.data.Product_In_Order.Product.productImage} alt="" />
            </div>

            <div className={clsx(style.itemInfo)}>
                <div className={clsx(style.itemName)}>
                    <p>Name: {props.data.Product_In_Order == null ? null : props.data.Product_In_Order.Product.productName}</p>
                </div>

                <div className={clsx(style.purchaseTime)}>
                    <p>Purchase Time: {formattedDate}</p>
                </div>
            </div>

            <div className={clsx(style.viewFeedback)}>
                <div className={clsx(style.viewFeedbackBtn, {[style.hidden]: props.data.isRated === 0})}
                onClick={() => {
                    navigate("/customerRate?pIOId=" + props.data.productInOrderId + "&isRated="+ props.data.isRated);
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                }}
                >
                    View My Feedback
                </div>

                <div className={clsx(style.giveFeedbackBtn, {[style.hidden]: props.data.isRated === 1})}
                onClick={() => {
                    navigate("/customerRate?pIOId=" + props.data.productInOrderId + "&isRated="+ props.data.isRated);
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                }}
                >
                    Give My Feedback
                </div>
            </div>
        </div>
    )
};

export default CompletedItem;