import { useState } from "react"
import { Sidebar } from "flowbite-react";
import style from "./SideBar.module.scss";
import clsx from 'clsx';
import { IoPersonCircleOutline } from "react-icons/io5";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

export const PSidebar = (props) => {
    const redStyle = {
        color: 'red',
    };

    return (
        <div className= {clsx(style.container)}>
            <Sidebar aria-label="Default sidebar example">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item 
                        // className = {clsx=(style.sideBarItems)}
                        // href="#" 
                        icon={IoPersonCircleOutline} 
                        onClick={props.func.clickInformationPage}>
                            <div className={clsx(style.sideBarItems)}>
                                Information
                            </div>
                        </Sidebar.Item>
                        <Sidebar.Item 
                        // className = {clsx=(style.sideBarItems)}
                        // href="#" 
                        icon={ManageSearchIcon} 
                        onClick={props.func.clickHistoryPage}>
                            <div className={clsx(style.sideBarItems)}>
                                Orders History
                            </div>
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    )
}

export default PSidebar