import { useState } from "react"
import { Sidebar } from "flowbite-react";
import style from "./SideBar.module.scss";
import clsx from 'clsx;'

export const Sidebar = (props) => {
    

    return (
        <div className= {clsx(style.container)}>
            <Sidebar aria-label="Default sidebar example">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" 
                        icon={MdManageAccounts} 
                        onClick={props.func.clickInformationPage}>
                            Information
                        </Sidebar.Item>
                        <Sidebar.Item href="#" 
                        icon={BsArchiveFill} 
                        onClick={props.func.clickHistoryPage}>
                            Orders History
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    )
}

export default Sidebar