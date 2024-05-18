import React, { useEffect, useState } from "react";
import clsx from "clsx";
import style from "./ManageOrder.module.scss";
import { Table } from "flowbite-react";
import { apiGetOrderInfoForAdmin, apiConfirmOrder, apiAddToBoughtHistoryWhenConfirmed } from "../../../../services/order";
import { Pagination, Alert } from "flowbite-react";

function ManageOrder() {
    const [orderInfoForAdmin, setOrderInfoForAdmin] = useState([]); // ARRAY TO STORE ORDERS
    const [isFetchedData, setIsFetchedData] = useState(false); // FLAG TO CHECK IS FETCHED ORDERS DATA

    const [isVisibleAlertSuccess, setIsVisibleAlertSuccess] = useState(false); // FLAG TO CHECK IS VISIBLE ALERT SUCCESS

    // SET UP PAGINATION
    const [totalPage, setTotalPage] = useState();
    const [isTotalPageSet, setIsTotalPageSet] = useState(false);
    const quantityItemsPerpage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const lastIndex = currentPage * quantityItemsPerpage;
    const firstIndex = lastIndex - quantityItemsPerpage;
    const displayedOrder = orderInfoForAdmin.slice(firstIndex, lastIndex);
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    }

    // FETCH ORDERS DATA FUNCTION
    const handleGetOrderInfoForAdmin = async () => {
        try {
            const orderInfo = await apiGetOrderInfoForAdmin();
            const orders = orderInfo.data.response;
            setOrderInfoForAdmin(orders);
            setIsFetchedData(true);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        handleGetOrderInfoForAdmin();
    }, []);

    // PAGINATION
    useEffect(() => {
        if (isFetchedData) {
            const totalPages = Math.ceil(orderInfoForAdmin.length / quantityItemsPerpage);
            setTotalPage(totalPages);
            setIsTotalPageSet(true);
        }
    }, [isFetchedData, orderInfoForAdmin]);

    // FUNCTION TO HANDLE CONFIRM ORDER
    const handleConfirmOrder = async (orderId) => {
        try {
            await apiConfirmOrder(orderId);

            const confirmedOrder = orderInfoForAdmin.find(order => order.id === orderId);

            for (let i = 0; i < confirmedOrder.Product_In_Orders.length; i++) {
                const payload = {
                    productInOrderId: confirmedOrder.Product_In_Orders[i].id,
                    isRated: 0,
                    purchaseTime: new Date(),
                };

                await apiAddToBoughtHistoryWhenConfirmed(payload);
            }

            const updatedOrderInfo = orderInfoForAdmin.map(order => {
                if (order.id === orderId) {
                    return {
                        ...order,
                        status: "COMPLETED"
                    };
                }
                return order;
            });
            setOrderInfoForAdmin(updatedOrderInfo);

            setIsVisibleAlertSuccess(true);
            setTimeout(() => {
                setIsVisibleAlertSuccess(false);
            }, 500);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="overflow-x-auto">
            {/* ALERT SUCCESS */}
            {isVisibleAlertSuccess && (
                <div className={clsx(style["alert-container"])}>
                    <Alert color="success">
                        <span className="font-medium">Success!</span>
                    </Alert>
                </div>
            )}

            {/* ORDERS DATA */}
            <Table className="min-w-full divide-y divide-gray-200">
                <Table.Head>
                    <Table.HeadCell>Order ID</Table.HeadCell>
                    <Table.HeadCell>Account Name</Table.HeadCell>
                    <Table.HeadCell>Account Phone</Table.HeadCell>
                    <Table.HeadCell>Account Address</Table.HeadCell>
                    <Table.HeadCell>Product Name</Table.HeadCell>
                    <Table.HeadCell>Quantity</Table.HeadCell>
                    <Table.HeadCell>Total Price</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Confirm</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {displayedOrder && displayedOrder.length > 0 ? (
                        displayedOrder.map((order, orderIndex) => (
                            <React.Fragment key={order.id}>
                                {order.Product_In_Orders.map((productOrder, productIndex) => (
                                    <React.Fragment key={`${orderIndex}-${productIndex}`}>
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell>{productOrder.id === order.Product_In_Orders[0].id ? order.id : null}</Table.Cell>
                                            <Table.Cell>{productOrder.id === order.Product_In_Orders[0].id ? order.Account.accountName : null}</Table.Cell>
                                            <Table.Cell>{productOrder.id === order.Product_In_Orders[0].id ? order.Account.accountPhone : null}</Table.Cell>
                                            <Table.Cell>{productOrder.id === order.Product_In_Orders[0].id ? order.Account.accountAddress : null}</Table.Cell>
                                            <Table.Cell>{productOrder.Product.productName}</Table.Cell>
                                            <Table.Cell>{productOrder.quantity}</Table.Cell>
                                            <Table.Cell>{productOrder.id === order.Product_In_Orders[0].id ? order.totalPrice : null}</Table.Cell>
                                            <Table.Cell>{productOrder.id === order.Product_In_Orders[0].id ? order.status : null}</Table.Cell>
                                            <Table.Cell>
                                                {productOrder.id === order.Product_In_Orders[0].id && order.status === "WAITING" ? (
                                                    <a href="#"
                                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                                        onClick={() => handleConfirmOrder(order.id)}
                                                    >
                                                        Confirm
                                                    </a>
                                                ) : null}
                                            </Table.Cell>
                                        </Table.Row>
                                        {productIndex !== order.Product_In_Orders.length - 1 && (
                                            <Table.Row className="border-b border-gray-200 dark:border-gray-700">
                                                <Table.Cell colSpan="9"></Table.Cell>
                                            </Table.Row>
                                        )}
                                    </React.Fragment>
                                ))}
                                {orderIndex !== displayedOrder.length - 1 && (
                                    <Table.Row className="border-b border-gray-200 dark:border-gray-700">
                                        <Table.Cell colSpan="9"></Table.Cell>
                                    </Table.Row>
                                )}
                            </React.Fragment>
                        ))
                    ) : null}
                </Table.Body>
            </Table>

            {/* PAGINATION */}
            {isTotalPageSet && orderInfoForAdmin.length > 0 ? (
                <div className="flex justify-center">
                    <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={onPageChange} />
                </div>
            ) : null}
        </div>
    );
}

export default ManageOrder;
