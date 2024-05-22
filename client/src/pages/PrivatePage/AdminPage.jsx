import React, { Fragment, useEffect } from "react";
import clsx from "clsx";
import style from "./AdminPage.module.scss";
import Header from "../../components/Header/Header";
import Navbar from "./components/Navbar/Navbar";

const AdminPage = () => {
    return (
        <Fragment>
            <Header />
            <Navbar />
        </Fragment>
    )
};

export default AdminPage;
