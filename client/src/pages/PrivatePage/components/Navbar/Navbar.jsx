import React, { useEffect, useState } from "react";
import clsx from "clsx";
import style from './Navbar.module.scss';
import { Sidebar } from "flowbite-react";
import { MdManageAccounts } from "react-icons/md";
import { TfiBarChart } from "react-icons/tfi";
import { BsArchiveFill } from "react-icons/bs";
import { TbShoppingCartCog } from "react-icons/tb";
import ManageAccount from "../ManageAccount/ManageAccount";
import ManageProduct from "../ManageProduct/ManageProduct"; 
import ManageOrder from "../ManageOrder/ManageOrder";
import OrderStatistics from "../OrderStatistics/OrderStatistics";

function Navbar() {
    const [clickState, setClickState] = useState({
        manageAccount: true,
        manageProduct: false,
        manageOrder: false,
        orderStatistics: false,
    });

    const handleClickStateManageAccount = () => {
        setClickState({
            manageAccount: true,
            manageProduct: false,
            manageOrder: false,
            orderStatistics: false,
        });
    }

    const handleClickStateManageProduct = () => {
        setClickState({
            manageAccount: false,
            manageProduct: true,
            manageOrder: false,
            orderStatistics: false,
        });
    }

    const handleClickStateManageOrder = () => {
        setClickState({
            manageAccount: false,
            manageProduct: false,
            manageOrder: true,
            orderStatistics: false,
        });
    }

    const handleClickOrderStatistics = () => {
        setClickState({
            manageAccount: false,
            manageProduct: false,
            manageOrder: false,
            orderStatistics: true,
        });
    }

    return (
        <div className={clsx(style.container)}>
            <Sidebar aria-label="Default sidebar example">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={MdManageAccounts} onClick={handleClickStateManageAccount}>
                            Manage Account
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={BsArchiveFill} onClick={handleClickStateManageProduct}>
                            Manage Product
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={TbShoppingCartCog} onClick={handleClickStateManageOrder}>
                            Manage Order
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={TfiBarChart} onClick={handleClickOrderStatistics}>
                            Order Statistics
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
            {clickState.manageAccount && <ManageAccount />}
            {clickState.manageProduct && <ManageProduct />}
            {clickState.manageOrder && <ManageOrder />}
            {clickState.orderStatistics && <OrderStatistics />}
        </div>
    );
}

export default Navbar;
