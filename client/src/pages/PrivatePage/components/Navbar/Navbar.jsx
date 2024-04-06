import React from "react";
import clsx from "clsx";
import style from './Navbar.module.scss';
import { Sidebar } from "flowbite-react";
import { MdManageAccounts } from "react-icons/md";
import { TfiBarChart } from "react-icons/tfi";
import { BsArchiveFill } from "react-icons/bs";
import { TbShoppingCartCog } from "react-icons/tb";

function Navbar() {
    return (
        <div className={clsx(style.container)}>
            <Sidebar aria-label="Default sidebar example" id={clsx(style.test)}>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={MdManageAccounts}>
                            Manage Account
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={BsArchiveFill}>
                            Manage Product
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={TbShoppingCartCog}>
                            Manage Order
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={TfiBarChart}>
                            Order Statistics
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
}

export default Navbar;
