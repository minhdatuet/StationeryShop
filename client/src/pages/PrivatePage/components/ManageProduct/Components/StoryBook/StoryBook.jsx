import React, { useEffect, useState } from "react";
import clsx from "clsx";
import style from "./StoryBook.module.scss";
import { Table } from "flowbite-react";
import { apiGetProductByCatalogIdForAdmin } from "../../../../../../services/product";
import { handleAdminDeleteProduct } from "../../ManageProductFunction/DeleteProduct";

function StoryBook() {
    const STORYBOOK_CATALOG_ID = 9;

    const [storybookInfoForAdmin, setStorybookInfoForAdmin] = useState([]);
    const [isFetchedData, setIsFetchedData] = useState(false);

    const [isVisibleConfirmDeleteProductWindow, setIsVisibleConfirmDeleteProductWindow] = useState(false);
    const [deleteId, setDeleteId] = useState();

    const handleGetStorybookInfoForAdmin = async () => {
        const response = await apiGetProductByCatalogIdForAdmin(STORYBOOK_CATALOG_ID);
        setStorybookInfoForAdmin(response.data.response);
        setIsFetchedData(true);
    }

    useEffect(() => {
        handleGetStorybookInfoForAdmin();
    }, [isFetchedData]);

    const handleClickDeleteProduct = (productId) => {
        setDeleteId(productId);
        setIsVisibleConfirmDeleteProductWindow(true);
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
                            onClick={() => {handleAdminDeleteProduct(deleteId, setStorybookInfoForAdmin, setIsVisibleConfirmDeleteProductWindow)}}
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
                    {storybookInfoForAdmin.map((storybookInfoForAdmin) => (
                        <Table.Row key={storybookInfoForAdmin.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" width={'30%'}>
                                {storybookInfoForAdmin.productName}
                            </Table.Cell>
                            <Table.Cell>{storybookInfoForAdmin.productQuantity}</Table.Cell>
                            <Table.Cell>{storybookInfoForAdmin.productCost} $</Table.Cell>
                            <Table.Cell>
                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    Edit
                                </a>
                            </Table.Cell>
                            <Table.Cell>
                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" onClick={() => handleClickDeleteProduct(storybookInfoForAdmin.id)}>
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

export default StoryBook;
