import { Fragment, useState } from "react";
import Sidebar from "./components/SideBar/SideBar";
import clsx from 'clsx';
import style from './Personal.module.scss'
import Information from "./components/Information/Information";
import History from "./components/OrdersHistory/History";

export const Personal = () => {

    const [pState, setPState] = useState({
        isInformationPage: true,
        isHistoryPage: false
    });

    const clickInformationPage = () => {
        setPState({
            isInformationPage: true,
            isHistoryPage : false
        });
    };

    const clickHistoryPage = () => {
        setPState({
            isInformationPage : false,
            isHistoryPage : true
        })
    }

    return (
        <Fragment>
            <div className={clsx(style.container)}>
                <div className={clsx(style.sidebarContainer)}>
                    <Sidebar func = {
                        {clickHistoryPage, clickInformationPage}
                    } />
                </div>

                <div className={clsx(style.contentContainer)}>
                    <div className={clsx(style.informationPageContainer)}>
                        <Information />
                    </div>

                    <div className={clsx(style.historyPageContainer)}>
                        <History />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Personal;