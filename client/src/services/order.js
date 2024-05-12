import axiosConfig from '../axiousConfig'

export const apiGetComfirmingOrderByID = (id) =>  new Promise(async(resolve, reject) => {
    try {
        // console.log(id);
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/order/getConfirmingOrderById/${id}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
});


export const apiGetPendingOrderByID = (id) =>  new Promise(async(resolve, reject) => {
    try {
        // console.log(id);
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/order/getPendingOrderById/${id}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

export const apiGetBoughtHistoryByAID = (aId) =>  new Promise(async(resolve, reject) => {
    try {
        // console.log(id);
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/order/getBoughtHistoryById/${aId}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

export const apiGetProductsInOrderByOId = (oId) =>  new Promise(async(resolve, reject) => {
    try {
        // console.log(id);
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/order/getProductsInOrder/${oId}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

export const apiGetOrderInfoForAdmin = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/order/get/get-order-info-for-admin',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

export const apiConfirmOrder = (id) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/order/update/confirm-order/${id}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

export const apiAddToBoughtHistoryWhenConfirmed = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/order/post/add-to-bought-history-when-confirmed',
            data: payload
        })
        resolve(response);
    }
    catch (error) {
        reject(error);
    }
});
