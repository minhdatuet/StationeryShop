import { Fragment, useEffect, useState } from "react";
import Sidebar from "./components/SideBar/SideBar";
import clsx from 'clsx';
import style from './Personal.module.scss'
import Information from "./components/Information/Information";
import History from "./components/OrdersHistory/History";
import { apiGetDetailInfoByID } from "../../../services/user";

export const Personal = () => {

    const accId = localStorage.getItem('id');;

    const [pState, setPState] = useState({
        isInformationPage: true,
        isHistoryPage: false
    });

    const clickInformationPage = () => {
        // console.log(1);
        // getInformationData();
        setPState({
            isInformationPage: true,
            isHistoryPage : false
        });
    };

    const clickHistoryPage = () => {
        // console.log(2);
        setPState({
            isInformationPage : false,
            isHistoryPage : true
        })
    }

    // const getInformationData = async() => {
    //     try {
    //         const response = await apiGetDetailInfoByID(1);
    //         console.log(response.data.response.accountName);
    //         setPInfo({
    //             aId: response.data.response.id,
    //             aName: response.data.response.accountName,
    //             aPhone: response.data.response.accountPhone,
    //             aEmail: response.data.response.accountEmail,
    //             aAddress: response.data.response.accountAddress,
    //             aPassword: response.data.response.accountPassword,
    //         });
    //         console.log(pInfo);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getInformationData();
    // }, [1]);

    return (
        <Fragment>
            <div className={clsx(style.container)}>
                <div className={clsx(style.sidebarContainer)}>
                    <Sidebar func = {
                        {clickHistoryPage, clickInformationPage}
                    } />
                </div>

                <div className={clsx(style.contentContainer)}>
                    <div className={clsx(style.informationPageContainer, {[style.hidden] : !pState.isInformationPage})}>
                        <Information pData = {accId} />
                    </div>

                    <div className={clsx(style.historyPageContainer, {[style.hidden] : !pState.isHistoryPage})}>
                        <History />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Personal;