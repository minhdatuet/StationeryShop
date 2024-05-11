import { Fragment, useEffect, useState } from "react";
import Sidebar from "./components/SideBar/SideBar";
import clsx from 'clsx';
import style from './Rate.module.scss';

export const Personal = () => {

    const accId = localStorage.getItem('id');

    return (
            <div className={clsx(style.container)}>
                
            </div>
    );
}

export default Personal;