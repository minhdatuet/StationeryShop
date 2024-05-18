import { useState } from "react"
import { Sidebar } from "flowbite-react";
import style from "./SideBar.module.scss";
import clsx from 'clsx';
import { IoPersonCircleOutline } from "react-icons/io5";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { RiShutDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../../../store/actions'

export const PSidebar = (props) => {
    const dispatch = useDispatch()

    const redStyle = {
        color: 'red',
    };

    const navigate = useNavigate();

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

                        <Sidebar.Item 
                        // className = {clsx=(style.sideBarItems)}
                        // href="#" 
                        icon={RiShutDownLine} 
                        onClick={() => {
                            localStorage.clear();
                            dispatch(actions.logout());
                            navigate('/')
                        }}>
                            <div className={clsx(style.sideBarItems)}>
                                Log Out
                            </div>
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    )
}

export default PSidebar