import { Fragment, useEffect, useState } from "react";
import Sidebar from "./components/SideBar/SideBar";
import clsx from 'clsx';
import style from './Personal.module.scss'
import Information from "./components/Information/Information";
import History from "./components/OrdersHistory/History";
import { apiGetDetailInfoByID } from "../../../services/user";

export const Personal = () => {

    const [pInfo, setPInfo] = useState({
        aId: "",
        aName: "",
        aPhone: "",
        aEmail: null,
        aAddress: "",
        aPassword: "",

    })

    const [pState, setPState] = useState({
        isInformationPage: true,
        isHistoryPage: false
    });

    const clickInformationPage = () => {
        // console.log(1);
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

    const getInformationData = async() => {
        try {
            const response = await apiGetDetailInfoByID(1);
            console.log(response.data.response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInformationData();
    }, [1]);

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
                        <Information pData = {pInfo} />
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