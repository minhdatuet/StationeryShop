import React, { useEffect, useState } from "react";
import clsx from "clsx";
import style from "./Notebook.module.scss";
import { Table } from "flowbite-react";
import { apiGetProductByCatalogIdForAdmin, apiAdminDeleteProductById } from "../../../../../../services/product";

function Notebook() {
    const NOTEBOOK_CATALOG_ID = 5;

    const [notebookInfoForAdmin, setNotebookInfoForAdmin] = useState([]);
    const [isFetchedData, setIsFetchedData] = useState(false);

    const [isVisibleConfirmDeleteProductWindow, setIsVisibleConfirmDeleteProductWindow] = useState(false);
    const [deleteId, setDeleteId] = useState();

    const handleGetNotebookInfoForAdmin = async () => {
        const response = await apiGetProductByCatalogIdForAdmin(NOTEBOOK_CATALOG_ID);
        setNotebookInfoForAdmin(response.data.response);
        setIsFetchedData(true);
    }

    useEffect(() => {
        handleGetNotebookInfoForAdmin();
    }, [isFetchedData]);

    const handleClickDeleteProduct = (productId) => {
        setDeleteId(productId);
        setIsVisibleConfirmDeleteProductWindow(true);
    }

    const handleAdminDeleteProduct = async () => {
        try {
            await apiAdminDeleteProductById(deleteId);
            setNotebookInfoForAdmin(prevNotebookInfoForAdmin => prevNotebookInfoForAdmin.filter(notebookInfoForAdmin => notebookInfoForAdmin.id !== deleteId));
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
                    {notebookInfoForAdmin.map((notebookInfoForAdmin) => (
                        <Table.Row key={notebookInfoForAdmin.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" width={'30%'}>
                                {notebookInfoForAdmin.productName}
                            </Table.Cell>
                            <Table.Cell>{notebookInfoForAdmin.productQuantity}</Table.Cell>
                            <Table.Cell>{notebookInfoForAdmin.productCost} $</Table.Cell>
                            <Table.Cell>
                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    Edit
                                </a>
                            </Table.Cell>
                            <Table.Cell>
                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" onClick={() => handleClickDeleteProduct(notebookInfoForAdmin.id)}>
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

export default Notebook;
