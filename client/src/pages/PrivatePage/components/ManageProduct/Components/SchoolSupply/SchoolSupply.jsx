import React, { useEffect, useState } from "react";
import clsx from "clsx";
import style from "./SchoolSupply.module.scss";
import { Table } from "flowbite-react";
import { apiGetProductByCatalogIdForAdmin, apiAdminDeleteProductById } from "../../../../../../services/product";

function SchoolSupply() {
    const SCHOOLSUPPLY_CATALOG_ID = 7;

    const [schoolsupplyInfoForAdmin, setSchoolsupplyInfoForAdmin] = useState([]);
    const [isFetchedData, setIsFetchedData] = useState(false);

    const [isVisibleConfirmDeleteProductWindow, setIsVisibleConfirmDeleteProductWindow] = useState(false);
    const [deleteId, setDeleteId] = useState();

    const handleGetSchoolsupplyInfoForAdmin = async () => {
        const response = await apiGetProductByCatalogIdForAdmin(SCHOOLSUPPLY_CATALOG_ID);
        setSchoolsupplyInfoForAdmin(response.data.response);
        setIsFetchedData(true);
    }

    useEffect(() => {
        handleGetSchoolsupplyInfoForAdmin();
    }, [isFetchedData]);

    const handleClickDeleteProduct = (productId) => {
        setDeleteId(productId);
        setIsVisibleConfirmDeleteProductWindow(true);
    }

    const handleAdminDeleteProduct = async () => {
        try {
            await apiAdminDeleteProductById(deleteId);
            setSchoolsupplyInfoForAdmin(prevSchoolsupplyInfoForAdmin => prevSchoolsupplyInfoForAdmin.filter(schoolsupplyInfoForAdmin => schoolsupplyInfoForAdmin.id !== deleteId));
        }
        catch (error) {
            console.log(error);
        }
        setIsVisibleConfirmDeleteProductWindow(false);
    }

    return (
        <div>
            {/* CONFIRM DELETE ACCOUNT WINDOW */}
            {isVisibleConfirmDeleteProductWindow && (
                <div className={clsx(style["confirm-delete-window"])} data-aos="flip-up">
                    <h2>Are you sure you want to delete this product?</h2>
                    <div className={clsx(style["button-confirm-window"])}>
                        <button
                            id={clsx(style["confirm-delete-product-button"])}
                            onClick={handleAdminDeleteProduct}
                        >
                            Confirm
                        </button>
                        <button
                            id={clsx(style["cancel-delete-product-button"])}
                            onClick={() => setIsVisibleConfirmDeleteProductWindow(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <Table>
                <Table.Head>
                    <Table.HeadCell>Product name</Table.HeadCell>
                    <Table.HeadCell>Product Quantity</Table.HeadCell>
                    <Table.HeadCell>Product Cost</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Delete</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {schoolsupplyInfoForAdmin.map((schoolsupplyInfoForAdmin) => (
                        <Table.Row key={schoolsupplyInfoForAdmin.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" width={'30%'}>
                                {schoolsupplyInfoForAdmin.productName}
                            </Table.Cell>
                            <Table.Cell>{schoolsupplyInfoForAdmin.productQuantity}</Table.Cell>
                            <Table.Cell>{schoolsupplyInfoForAdmin.productCost} $</Table.Cell>
                            <Table.Cell>
                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    Edit
                                </a>
                            </Table.Cell>
                            <Table.Cell>
                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" onClick={() => handleClickDeleteProduct(schoolsupplyInfoForAdmin.id)}>
                                    Delete
                                </a>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}

export default SchoolSupply;
