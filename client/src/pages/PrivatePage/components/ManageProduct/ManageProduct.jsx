import React, { useState } from "react";
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
import { Button, Label, TextInput } from "flowbite-react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { apiCreateNewProduct } from "../../../../services/product";

function ManageProduct() {
    const category = {
        "Backpack" : 1,
        "Book": 2,
        "Casio": 3,
        "Desk Lamp": 4,
        "Notebook": 5,
        "Pen": 6,
        "School Supply": 7,
        "Stationery Supply": 8,
        "Story Book": 9,
        "Table and Chair": 10
    }

    const [isVisibleAddNewProductForm, setIsVisibleAddNewProductForm] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState("Backpack");

    // FLAG TO HANDLE ERROR FOR PRODUCT IN ADD PRODUCT FORM
    const [errorForProductNameInAddProductForm, setErrorForProductNameInAddProductForm] = useState(false);
    const [errorForProductURLInAddProductForm, setErrorForProductURLInAddProductForm] = useState(false);
    const [errorForProductQuantityInAddProductForm, setErrorForProductQuantityInAddProductForm] = useState(false);
    const [errorForProductCostInAddProductForm, setErrorForProductCostInAddProductForm] = useState(false);
    const [errorForProductDescriptionInAddProductForm, setErrorForProductDescriptionInAddProductForm] = useState(false);

    // VARIABLE FOR STORE NAME URL QUANTITY DESCRIPTION FOR NEW PRODUCT IN ADD PRODUCT FORM
    const [productNameInAddProductForm, setProductNameInAddProductForm] = useState("");
    const [productURLInAddProductForm, setProductURLInAddProductForm] = useState("");
    const [productQuantityInAddProductForm, setProductQuantityInAddProductForm] = useState("");
    const [productCostInAddProductForm, setProductCostInAddProductForm] = useState("");
    const [productDescriptionInAddProductForm, setProductDescriptionInAddProductForm] = useState("");

    const handleVisibleFormAddNewProduct = () => {
        setIsVisibleAddNewProductForm(true);
    }

    const handleSubmitInAddProductForm = async () => {
        let hasAnyError = false;

        if (productNameInAddProductForm === "") {
            setErrorForProductNameInAddProductForm(true);
            hasAnyError = true;
        } else {
            setErrorForProductNameInAddProductForm(false);
        }

        if (productURLInAddProductForm === "") {
            setErrorForProductURLInAddProductForm(true);
            hasAnyError = true;
        } else {
            setErrorForProductURLInAddProductForm(false);
        }

        if (parseInt(productQuantityInAddProductForm) <= 0 || !Number.isInteger(parseFloat(productQuantityInAddProductForm)) || productQuantityInAddProductForm === "") {
            setErrorForProductQuantityInAddProductForm(true);
            hasAnyError = true;
        } else {
            setErrorForProductQuantityInAddProductForm(false);
        }

        if (parseFloat(productCostInAddProductForm) <= 0 || isNaN(productCostInAddProductForm) || productCostInAddProductForm === "") {
            setErrorForProductCostInAddProductForm(true);
            hasAnyError = true;
        } else {
            setErrorForProductCostInAddProductForm(false);
        }

        if (productDescriptionInAddProductForm === "") {
            setErrorForProductDescriptionInAddProductForm(true);
            hasAnyError = true;
        } else {
            setErrorForProductDescriptionInAddProductForm(false);
        }
        
        if (!hasAnyError) {
            const payload = {
                productName: productNameInAddProductForm,
                productImage: productURLInAddProductForm,
                productQuantity: parseInt(productQuantityInAddProductForm),
                productCost: parseFloat(productCostInAddProductForm),
                productDescription: productDescriptionInAddProductForm,
                catalogId: category[selectedCategory]
            };

            await apiCreateNewProduct(payload);

            setTimeout(() => {
                setIsVisibleAddNewProductForm(false);
            })

            setProductNameInAddProductForm("");
            setProductURLInAddProductForm("");
            setProductQuantityInAddProductForm("");
            setProductCostInAddProductForm("");
            setProductDescriptionInAddProductForm("");
        }
    }

    return (
        <div className={clsx(style.container)}>
            {/* BUTTON ADD NEW PRODUCT */}
            <div
                className={clsx(style["add-new-product-button-container"])}
            >
                <Button
                    color="success"
                    onClick={handleVisibleFormAddNewProduct}
                >
                    <IoMdAddCircleOutline className="mr-2 h-5 w-5" />
                    Add New Product
                </Button>
            </div>

            {
                isVisibleAddNewProductForm && (
                    <div className={clsx(style["form-add-new-container"])}>
                        <form className="flex max-w-md flex-col gap-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="name" value="Enter product name" />
                                </div>
                                <TextInput
                                    id="name"
                                    type="text"
                                    required
                                    shadow
                                    value={productNameInAddProductForm}
                                    onChange={(e) => setProductNameInAddProductForm(e.target.value)}
                                    onClick={() => { setErrorForProductNameInAddProductForm(false) }}
                                />
                                <div
                                    className={clsx(style["error-message"])}
                                    id={clsx(
                                        !errorForProductNameInAddProductForm ? style["error-for-name-hidden"] : style[""]
                                    )}
                                >
                                    Product name is invalid
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="URL" value="Enter product URL" />
                                </div>
                                <TextInput
                                    id="url"
                                    type="text"
                                    required
                                    shadow
                                    value={productURLInAddProductForm}
                                    onChange={(e) => setProductURLInAddProductForm(e.target.value)}
                                    onClick={() => { setErrorForProductURLInAddProductForm(false) }}
                                />
                                <div
                                    className={clsx(style["error-message"])}
                                    id={clsx(
                                        !errorForProductURLInAddProductForm ? style["error-for-url-hidden"] : style[""]
                                    )}
                                >
                                    Product URL is invalid
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="quantity" value="Enter product quantity" />
                                </div>
                                <TextInput
                                    id="quantity"
                                    type="text"
                                    placeholder=""
                                    required
                                    shadow
                                    value={productQuantityInAddProductForm}
                                    onChange={(e) => setProductQuantityInAddProductForm(e.target.value)}
                                    onClick={() => { setErrorForProductQuantityInAddProductForm(false) }}
                                />
                                <div
                                    className={clsx(style["error-message"])}
                                    id={clsx(
                                        !errorForProductQuantityInAddProductForm ? style["error-for-quantity-hidden"] : style[""]
                                    )}
                                >
                                    Product quantiy is invalid
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="cost" value="Enter product cost" />
                                </div>
                                <TextInput
                                    id="cost"
                                    type="text"
                                    placeholder=""
                                    required
                                    shadow
                                    value={productCostInAddProductForm}
                                    onChange={(e) => setProductCostInAddProductForm(e.target.value)}
                                    onClick={() => { setErrorForProductCostInAddProductForm(false) }}
                                />
                                <div
                                    className={clsx(style["error-message"])}
                                    id={clsx(
                                        !errorForProductCostInAddProductForm ? style["error-for-cost-hidden"] : style[""]
                                    )}
                                >
                                    Product cost is invalid
                                </div>
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="description" value="Enter product description" />
                                </div>
                                <TextInput
                                    id="description"
                                    type="text"
                                    placeholder=""
                                    required
                                    shadow
                                    value={productDescriptionInAddProductForm}
                                    onChange={(e) => setProductDescriptionInAddProductForm(e.target.value)}
                                    onClick={() => { setErrorForProductDescriptionInAddProductForm(false) }}
                                />
                                <div
                                    className={clsx(style["error-message"])}
                                    id={clsx(
                                        !errorForProductDescriptionInAddProductForm ? style["error-for-description-hidden"] : style[""]
                                    )}
                                >
                                    Product description is invalid
                                </div>
                            </div>
                            <div>
                                <label htmlFor="">
                                    Choose product category:
                                </label>
                                <select
                                    name="category"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="Backpack">Backpack</option>
                                    <option value="Book">Book</option>
                                    <option value="Casio">Casio</option>
                                    <option value="Desklamp">Desklamp</option>
                                    <option value="Notebook">Notebook</option>
                                    <option value="Pen">Pen</option>
                                    <option value="School Supply">School Supply</option>
                                    <option value="Stationery Supply">Stationery Supply</option>
                                    <option value="Story Book">Story Book</option>
                                    <option value="Table and Chair">Table And Chair</option>
                                </select>
                            </div>
                            <div className={clsx(style["button-container"])}>
                                <button
                                    id={clsx(style["submit-button"])}
                                    onClick={handleSubmitInAddProductForm}
                                >
                                    Submit
                                </button>
                                <button
                                    id={clsx(style["cancel-button"])}
                                    onClick={() => {
                                        setIsVisibleAddNewProductForm(false);

                                        setProductNameInAddProductForm("");
                                        setProductURLInAddProductForm("");
                                        setProductQuantityInAddProductForm("");
                                        setProductCostInAddProductForm("");
                                        setProductDescriptionInAddProductForm("");
        
                                        setErrorForProductNameInAddProductForm(false);
                                        setErrorForProductURLInAddProductForm(false);
                                        setErrorForProductQuantityInAddProductForm(false);
                                        setErrorForProductCostInAddProductForm(false);
                                        setErrorForProductDescriptionInAddProductForm(false);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }

            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Backpack" icon={MdBackpack}>
                    <Backpack/>
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
