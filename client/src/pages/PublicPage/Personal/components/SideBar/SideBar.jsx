import { useState } from "react"
import { Sidebar } from "flowbite-react";
import style from "./SideBar.module.scss";
import clsx from 'clsx';
import { IoPersonCircleOutline } from "react-icons/io5";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

export const PSidebar = (props) => {
    

    return (
        <div className= {clsx(style.container)}>
            <Sidebar aria-label="Default sidebar example">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" 
                        icon={IoPersonCircleOutline} 
                        onClick={props.func.clickInformationPage}>
                            Information
                        </Sidebar.Item>
                        <Sidebar.Item href="#" 
                        icon={ManageSearchIcon} 
                        onClick={props.func.clickHistoryPage}>
                            Orders History
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    )
}

export default PSidebar