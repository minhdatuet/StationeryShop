import React, { useEffect, useState } from "react";
import clsx from "clsx";
import style from "./ManageAccount.module.scss";
import { apiGetAllCustomerInfo } from "../../../../services/user";

function ManageAccount() {
    const [customerInfo, setCustomerInfo] = useState([]);
    const [isFetchedData, setIsFetchedData] = useState(false);

    const handleGetData = async () => {
        try {
            const response = await apiGetAllCustomerInfo();
            setCustomerInfo(response.data.response);
            setIsFetchedData(true);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        handleGetData();
        console.log(customerInfo);
    }, [isFetchedData]);

    return (
        <div className={clsx(style.container)}>
            {customerInfo.length > 0 && customerInfo.map((customer) => (
                <div key={customer.id} className={clsx(style["sub-container"])}>
                    <div className={clsx(style["account-info-container"])}>
                        <div>
                            <label htmlFor="">Account Name: </label>
                            <span>{customer.accountName}</span>
                        </div>
                        <div>
                            <label htmlFor="">Account Phone: </label>
                            <span>{customer.accountPhone}</span>
                        </div>
                        <div>
                            <label htmlFor="">Account Email: </label>
                            <span>{customer.accountEmail}</span>
                        </div>
                    </div>
                    <div className={clsx(style["button-container"])}>
                        <button id={clsx(style["modify-button"])}>
                            Modify
                        </button>
                        <button id={clsx(style["delete-button"])}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ManageAccount;
