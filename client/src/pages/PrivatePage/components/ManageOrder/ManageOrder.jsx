import React, { useEffect, useState } from "react";
import style from "./ManageOrder.module.scss";
import { Table } from "flowbite-react";
import { apiGetOrderInfoForAdmin, apiConfirmOrder } from "../../../../services/order";
import { Pagination } from "flowbite-react";

function ManageOrder() {
    const [orderInfoForAdmin, setOrderInfoForAdmin] = useState([]);
    const [isFetchedData, setIsFetchedData] = useState(false);

    // SET UP PAGINATION
    const [totalPage, setTotalPage] = useState();
    const [isTotalPageSet, setIsTotalPageSet] = useState(false);
    const quantityItemsPerpage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const lastIndex = currentPage * quantityItemsPerpage;
    const firstIndex = lastIndex - quantityItemsPerpage;
    const displayedOrder = orderInfoForAdmin.slice(firstIndex, lastIndex);
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    }

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

    useEffect(() => {
        if (isFetchedData) {
            const totalPages = Math.ceil(orderInfoForAdmin.length / quantityItemsPerpage);
            setTotalPage(totalPages);
            setIsTotalPageSet(true);
        }
    }, [isFetchedData, orderInfoForAdmin]);

    const handleConfirmOrder = async (orderId) => {
        try {
            await apiConfirmOrder(orderId);
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
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full divide-y divide-gray-200">
                <Table.Head>
                    <Table.HeadCell>Order ID</Table.HeadCell>
                    <Table.HeadCell>Account Name</Table.HeadCell>
                    <Table.HeadCell>Account Phone</Table.HeadCell>
                    <Table.HeadCell>Account Address</Table.HeadCell>
                    <Table.HeadCell>Product Name</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                    <Table.HeadCell>Total Price</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Confirm</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {displayedOrder && displayedOrder.length > 0 ? (
                        displayedOrder.map((order) => (
                            <Table.Row key={order.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{order.id}</Table.Cell>
                                <Table.Cell>{order.Account.accountName}</Table.Cell>
                                <Table.Cell>{order.Account.accountPhone}</Table.Cell>
                                <Table.Cell>{order.Account.accountAddress}</Table.Cell>
                                <Table.Cell>{order.Product_In_Orders[0].Product.productName}</Table.Cell>
                                <Table.Cell>{order.Product_In_Orders[0].Product.Catalog.catalogName}</Table.Cell>
                                <Table.Cell>{order.totalPrice}</Table.Cell>
                                <Table.Cell>{order.status}</Table.Cell>
                                <Table.Cell>
                                    {order.status === "WAITING" ? (
                                        <a href="#"
                                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                            onClick={() => handleConfirmOrder(order.id)}
                                        >
                                            Confirm
                                        </a>
                                    ) : null}
                                </Table.Cell>
                            </Table.Row>
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
