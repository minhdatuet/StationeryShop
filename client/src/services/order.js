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
