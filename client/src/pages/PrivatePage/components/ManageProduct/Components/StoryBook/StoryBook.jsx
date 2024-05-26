import React, { useEffect, useState } from "react";
import clsx from "clsx";
import style from "./StoryBook.module.scss";
import { Table } from "flowbite-react";
import { apiGetProductByCatalogIdForAdmin, apiEditProduct } from "../../../../../../services/product";
import { handleAdminDeleteProduct } from "../../ManageProductFunction/DeleteProduct";
import { Label, TextInput } from "flowbite-react";
import { Pagination } from "flowbite-react";

function StoryBook() {
    const STORYBOOK_CATALOG_ID = 9;

    const [storyBookInfoForAdmin, setStoryBookInfoForAdmin] = useState([]);
    const [isFetchedData, setIsFetchedData] = useState(false);

    const [isVisibleConfirmDeleteProductWindow, setIsVisibleConfirmDeleteProductWindow] = useState(false);
    const [deleteId, setDeleteId] = useState();

    const [isVisibleEditProductForm, setIsVisibleEditProductForm] = useState(false);

    const [errorForProductNameInEditProductForm, setErrorForProductNameInEditProductForm] = useState(false);
    const [errorForProductURLInEditProductForm, setErrorForProductURLInEditProductForm] = useState(false);
    const [errorForProductQuantityInEditProductForm, setErrorForProductQuantityInEditProductForm] = useState(false);
    const [errorForProductCostnEditProductForm, setErrorForProductCostInEditProductForm] = useState(false);
    const [errorForProductDescriptionInEditProductForm, setErrorForProductDescriptionInEditProductForm] = useState(false);

    const [editProductId, setEditProductId] = useState();

    const [productNameInEditProductForm, setProductNameInEditProductForm] = useState("");
    const [productURLInEditProductForm, setProductURLInEditProductForm] = useState("");
    const [productQuantityInEditProductForm, setProductQuantityInEditProductForm] = useState("");
    const [productCostInEditProductForm, setProductCostInEditProductForm] = useState("");
    const [productDescriptionInEditProductForm, setProductDescriptionInEditProductForm] = useState("");

    // SET UP PAGINATION
    const [totalPage, setTotalPage] = useState();
    const [isTotalPageSet, setIsTotalPageSet] = useState(false);
    const quantityItemsPerpage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const lastIndex = currentPage * quantityItemsPerpage;
    const firstIndex = lastIndex - quantityItemsPerpage;
    const displayedStoryBook = storyBookInfoForAdmin.slice(firstIndex, lastIndex);
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    }

    // PAGINATION
    useEffect(() => {
        if (isFetchedData) {
            const totalPages = Math.ceil(storyBookInfoForAdmin.length / quantityItemsPerpage);
            setTotalPage(totalPages);
            setIsTotalPageSet(true);
        }
    }, [isFetchedData, storyBookInfoForAdmin]);

    const handleGetStoryBookInfoForAdmin = async () => {
        const response = await apiGetProductByCatalogIdForAdmin(STORYBOOK_CATALOG_ID);
        setStoryBookInfoForAdmin(response.data.response);
        setIsFetchedData(true);
    }

    useEffect(() => {
        handleGetStoryBookInfoForAdmin();
    }, [isFetchedData]);

    const handleClickDeleteProduct = (productId) => {
        setDeleteId(productId);
        setIsVisibleConfirmDeleteProductWindow(true);
    }

    const handleVisibleEditProductForm = (productId) => {
        setEditProductId(productId);
        setIsVisibleEditProductForm(true);
    }

    const handleSubmitEditProductForm = async () => {
        let hasAnyError = false;

        if (productNameInEditProductForm === "") {
            setErrorForProductNameInEditProductForm(true);
            hasAnyError = true;
        } else {
            setErrorForProductNameInEditProductForm(false);
        }

        if (productURLInEditProductForm === "") {
            setErrorForProductURLInEditProductForm(true);
            hasAnyError = true;
        } else {
            setErrorForProductURLInEditProductForm(false);
        }

        if (productQuantityInEditProductForm === "" || parseInt(productQuantityInEditProductForm) <= 0) {
            setErrorForProductQuantityInEditProductForm(true);
            hasAnyError = true;
        } else {
            setErrorForProductQuantityInEditProductForm(false);
        }

        if (productCostInEditProductForm === "" || parseFloat(productCostInEditProductForm) < 0) {
            setErrorForProductCostInEditProductForm(true);
            hasAnyError = true;
        } else {
            setErrorForProductCostInEditProductForm(false);
        }

        if (productDescriptionInEditProductForm === "") {
            setErrorForProductDescriptionInEditProductForm(true);
            hasAnyError = true;
        } else {
            setErrorForProductDescriptionInEditProductForm(false);
        }

        if (hasAnyError === false) {
            const payload = {
                id: editProductId,
                productName: productNameInEditProductForm,
                productImage: productURLInEditProductForm,
                productQuantity: productQuantityInEditProductForm,
                productCost: productCostInEditProductForm,
                productDescription: productDescriptionInEditProductForm
            }

            await apiEditProduct(payload);

            const updatedStoryBookInfo = storyBookInfoForAdmin.map(storyBookInfoForAdmin => {
                if (storyBookInfoForAdmin.id === editProductId) {
                    return {
                        ...storyBookInfoForAdmin,
                        productName: productNameInEditProductForm,
                        productImage: productURLInEditProductForm,
                        productQuantity: productQuantityInEditProductForm,
                        productCost: productCostInEditProductForm,
                        productDescription: productDescriptionInEditProductForm
                    };
                }
                return storyBookInfoForAdmin;
            });
            setStoryBookInfoForAdmin(updatedStoryBookInfo);

            setTimeout(() => {
                setIsVisibleEditProductForm(false);
            }, 200);

            setProductNameInEditProductForm("");
            setProductURLInEditProductForm("");
            setProductQuantityInEditProductForm("");
            setProductCostInEditProductForm("");
            setProductDescriptionInEditProductForm("");

            setErrorForProductNameInEditProductForm(false);
            setErrorForProductURLInEditProductForm(false);
            setErrorForProductQuantityInEditProductForm(false);
            setErrorForProductCostInEditProductForm(false);
            setErrorForProductDescriptionInEditProductForm(false);
        }
    }

    const handleCancelEditProductForm = () => {
        setIsVisibleEditProductForm(false);

        setProductNameInEditProductForm("");
        setProductURLInEditProductForm("");
        setProductQuantityInEditProductForm("");
        setProductCostInEditProductForm("");
        setProductDescriptionInEditProductForm("");

        setErrorForProductNameInEditProductForm(false);
        setErrorForProductURLInEditProductForm(false);
        setErrorForProductQuantityInEditProductForm(false);
        setErrorForProductCostInEditProductForm(false);
        setErrorForProductDescriptionInEditProductForm(false);
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
                            onClick={() => handleAdminDeleteProduct(deleteId, setStoryBookInfoForAdmin, setIsVisibleConfirmDeleteProductWindow)}
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

            {isVisibleEditProductForm && (
                <div className={clsx(style["form-edit-product-container"])}>
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
                                value={productNameInEditProductForm}
                                onChange={(e) => setProductNameInEditProductForm(e.target.value)}
                                onClick={() => {setErrorForProductNameInEditProductForm(false)}}
                            />
                            <div
                                className={clsx(style["error-message"])}
                                id={clsx(
                                    !errorForProductNameInEditProductForm ? style["error-for-name-hidden"] : style[""]
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
                                value={productURLInEditProductForm}
                                onChange={(e) => setProductURLInEditProductForm(e.target.value)}
                                onClick={() => {setErrorForProductURLInEditProductForm(false)}}
                            />
                            <div
                                className={clsx(style["error-message"])}
                                id={clsx(
                                    !errorForProductURLInEditProductForm ? style["error-for-url-hidden"] : style[""]
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
                                value={productQuantityInEditProductForm}
                                onChange={(e) => setProductQuantityInEditProductForm(e.target.value)}
                                onClick={() => {setErrorForProductQuantityInEditProductForm(false)}}
                            />
                            <div
                                className={clsx(style["error-message"])}
                                id={clsx(
                                    !errorForProductQuantityInEditProductForm ? style["error-for-quantity-hidden"] : style[""]
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
                                value={[productCostInEditProductForm]}
                                onChange={(e) => setProductCostInEditProductForm(e.target.value)}
                                onClick={() => {setErrorForProductCostInEditProductForm(false)}}
                            />
                            <div
                                className={clsx(style["error-message"])}
                                id={clsx(
                                    !errorForProductCostnEditProductForm ? style["error-for-cost-hidden"] : style[""]
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
                                value={productDescriptionInEditProductForm}
                                onChange={(e) => setProductDescriptionInEditProductForm(e.target.value)}
                                onClick={() => {setErrorForProductDescriptionInEditProductForm(false)}}
                            />
                            <div
                                className={clsx(style["error-message"])}
                                id={clsx(
                                    !errorForProductDescriptionInEditProductForm ? style["error-for-description-hidden"] : style[""]
                                )}
                            >
                                Product description is invalid
                            </div>
                        </div>
                        <div className={clsx(style["button-container"])}>
                            <button
                                id={clsx(style["submit-button"])}
                                onClick={handleSubmitEditProductForm}
                            >
                                Submit
                            </button>
                            <button
                                id={clsx(style["cancel-button"])}
                                onClick={handleCancelEditProductForm}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
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
                    {displayedStoryBook.map((storyBookInfoForAdmin) => (
                        <Table.Row key={storyBookInfoForAdmin.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" width={'30%'}>
                                {storyBookInfoForAdmin.productName}
                            </Table.Cell>
                            <Table.Cell>{storyBookInfoForAdmin.productQuantity}</Table.Cell>
                            <Table.Cell>{storyBookInfoForAdmin.productCost} $</Table.Cell>
                            <Table.Cell>
                                <a href="#" 
                                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                    onClick={() => {handleVisibleEditProductForm(storyBookInfoForAdmin.id)}}
                                >
                                    Edit
                                </a>
                            </Table.Cell>
                            <Table.Cell>
                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" onClick={() => handleClickDeleteProduct(storyBookInfoForAdmin.id)}>
                                    Delete
                                </a>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            {/* PAGINATION */}
            {isTotalPageSet && storyBookInfoForAdmin.length > 0 ? (
                <div className="flex justify-center">
                    <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={onPageChange} />
                </div>
            ) : null}
        </div>
    );
}

export default StoryBook;
