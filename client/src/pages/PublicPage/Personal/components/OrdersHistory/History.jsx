import { Fragment, useState } from "react";
import clsx from 'clsx';
import style from './History.module.scss'
import ConfirmingOrder from "./components/confirmingItem/confirmingOrder";
import PendingOrder from "./components/pendingOrder/pendingOrder";
import CompletedItem from "./components/completedItem/completetedItem";

export const History = () => {

    const [orderState, setOrderState] = useState("Confirming");

    const [confirmingData, setConfirmingData] = useState([]);
    const [pendingData, setPendingData] = useState([]);
    const [completedData, setCompletedData] = useState([]);


    return (
        <Fragment>
            <div className={clsx(style.historyNav)}>
                <div className={clsx(style.confirmingStatus)}
                onClick={() => {
                    setOrderState("Confirming");
                }}>
                    <p>Confirming</p>
                </div>

                <div className={clsx(style.pendingStatus)}
                onClick={() => {
                    setOrderState("Pending");
                }}>
                    <p>Pending</p>
                </div>

                <div className={clsx(style.completedStatus)}
                onClick={() => {
                    setOrderState("Completed");
                }}>
                    <p>Completed</p>
                </div>
            </div>

            <div className={clsx(style.contentConatainer)}>
                <div className={clsx(style.confirmingContainer)}>
                    {
                        confirmingData.map((item, index) => {
                            return (
                                <div className={clsx(style.itemContainer)} key={index}>
                                    <ConfirmingOrder data= {item} />
                                </div>
                            );
                        })
                    }
                </div>

                <div className={clsx(style.pendingContainer)}>
                    {
                        pendingData.map((item, index) => {
                            return (
                                <div className={clsx(style.itemContainer)} key={index}>
                                    <PendingOrder data= {item} />
                                </div>
                            );
                        })
                    }
                </div>

                <div className={clsx(style.completedContainer)}>
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