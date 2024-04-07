import React, { Fragment, useEffect } from "react";
import clsx from "clsx";
import style from "./AdminPage.module.scss";
import Header from "../../components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import ManageAccount from "./components/ManageAccount/ManageAccount";
import ManageProduct from "./components/ManageProduct/ManageProduct";
import ManageOrder from "./components/ManageOrder/ManageOrder";
import OrderStatistics from "./components/OrderStatistics/OrderStatistics";

const AdminPage = () => {
    return (
        <Fragment>
            <Header />
            <Navbar />
        </Fragment>
    )
};

export default AdminPage;
