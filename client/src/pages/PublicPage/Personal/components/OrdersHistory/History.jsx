import { Fragment, useEffect, useState } from "react";
import clsx from 'clsx';
import style from './History.module.scss'
import ConfirmingOrder from "./components/confirmingItem/confirmingOrder";
import PendingOrder from "./components/pendingOrder/pendingOrder";
import CompletedItem from "./components/completedItem/completetedItem";
import { apiGetComfirmingOrderByID, apiGetPendingOrderByID } from "../../../../../services/order";

export const History = () => {

    const accountId = localStorage.getItem('id');
    // console.log(accountId);

    const [orderState, setOrderState] = useState("Pending");

    const [confirmingData, setConfirmingData] = useState([]);
    const [pendingData, setPendingData] = useState([]);
    const [completedData, setCompletedData] = useState([]);

    const getData = async () => {
        // console.log(orderState);
        try {
            if(orderState === "Confirming") {
                const response = await apiGetComfirmingOrderByID(accountId);
                // console.log(response.data.response);
                setConfirmingData(response.data.response);
            }
            else if(orderState === "Pending") {
                const response = await apiGetPendingOrderByID(accountId);
                // console.log(response);
                setPendingData(response.data.response);
            }
            else { // orderState === "Completed"
    
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        getData();
    }, [orderState])

    return (
        <Fragment>
            <div className={clsx(style.historyNav)}>
                {/* <div className={clsx(style.confirmingStatus, {[style.bottomBorder]: orderState === "Confirming"})}
                onClick={() => {
                    setOrderState("Confirming");
                }}>
                    <p>Confirming</p>
                </div> */}

                <div className={clsx(style.pendingStatus, {[style.bottomBorder]: orderState === "Pending"})}
                onClick={() => {
                    setOrderState("Pending");
                }}>
                    <p>Pending</p>
                </div>

                <div className={clsx(style.completedStatus, {[style.bottomBorder]: orderState === "Completed"})}
                onClick={() => {
                    setOrderState("Completed");
                }}>
                    <p>Completed</p>
                </div>
            </div>

            <div className={clsx(style.contentConatainer)}>
                {/* <div className={clsx(style.confirmingContainer, {[style.hidden] : orderState !== "Confirming"})}>
                    {
                        confirmingData.map((item, index) => {
                            return (
                                <div className={clsx(style.itemContainer)} key={index}>
                                    <ConfirmingOrder data= {item} />
                                </div>
                            );
                        })
                    }
                </div> */}

                <div className={clsx(style.pendingContainer, {[style.hidden] : orderState !== "Pending"})}>
                    {
                        pendingData.map((item, index) => {
                            return (
                                <div className={clsx(style.itemContainer)} key={index}>
                                    {/* <p>{index}</p> */}
                                    <PendingOrder data= {item} />
                                </div>
                            );
                        })
                    }
                </div>

                <div className={clsx(style.completedContainer, {[style.hidden] : orderState !== "Completed"})}>
                    {
                        completedData.map((item, index) => {
                            return (
                                <div className={clsx(style.itemContainer)} key={index}>
                                    <CompletedItem data={item} />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </Fragment>
    );
}

export default History;