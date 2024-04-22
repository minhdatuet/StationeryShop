import React from "react";
import clsx from "clsx";
import style from "./ManageProduct.module.scss";
import { Tabs } from "flowbite-react";
import { MdBackpack } from "react-icons/md";
import { GiBookCover } from "react-icons/gi";
import { FaCalculator } from "react-icons/fa6";
import { LuLampDesk } from "react-icons/lu";
import { PiNotebookFill } from "react-icons/pi";
import { FaPenFancy } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { FaScissors } from "react-icons/fa6";
import { SiStorybook } from "react-icons/si";
import { TbBrandAirtable } from "react-icons/tb";
import Backpack from "./Components/Backpack/Backpack";
import Book from "./Components/Book/Book";
import Casio from "./Components/Casio/Casio";
import Desklamp from "./Components/Desklamp/Desklamp";
import Notebook from "./Components/Notebook/Notebook";
import Pen from "./Components/Pen/Pen";
import SchoolSupply from "./Components/SchoolSupply/SchoolSupply";
import StationerySupply from "./Components/StationerySupply/StationerySupply";
import StoryBook from "./Components/StoryBook/StoryBook";
import TableAndChair from "./Components/TableAndChair/TableAndChair";

function ManageProduct() {
    return (
        <div className={clsx(style.container)}>
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Backpack" icon={MdBackpack}>
                    <Backpack />
                </Tabs.Item>
                <Tabs.Item title="Book" icon={GiBookCover}>
                    <Book />
                </Tabs.Item>
                <Tabs.Item title="Casio" icon={FaCalculator}>
                    <Casio />
                </Tabs.Item>
                <Tabs.Item title="Desklamp" icon={LuLampDesk}>
                    <Desklamp />
                </Tabs.Item>
                <Tabs.Item title="Notebook" icon={PiNotebookFill}>
                    <Notebook />
                </Tabs.Item>
                <Tabs.Item title="Pen" icon={FaPenFancy}>
                    <Pen />
                </Tabs.Item>
                <Tabs.Item title="SchoolSupply" icon={IoSchool}>
                    <SchoolSupply />
                </Tabs.Item>
                <Tabs.Item title="StationerySupply" icon={FaScissors}>
                    <StationerySupply />
                </Tabs.Item>
                <Tabs.Item title="StoryBook" icon={SiStorybook}>
                    <StoryBook />
                </Tabs.Item>
                <Tabs.Item title="TableAndChair" icon={TbBrandAirtable}>
                    <TableAndChair />
                </Tabs.Item>
            </Tabs>
        </div>
    )
}

export default ManageProduct;
