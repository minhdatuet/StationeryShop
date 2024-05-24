import axiosConfig from '../axiousConfig'

export const apiCreatePaymentLink = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/payment/post/create-payment-link',
            data: payload
        })
        resolve(response);
    }
    catch (error) {
        reject(error);
    }
});

export const apiGetPaymentLinkInfomation = (orderId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/payment/get/get-payment-link-infomation/${orderId}`,
        })
        resolve(response);
    }
    catch (error) {
        reject(error);
    }
});

export const apiCancelPaymentLink = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/payment/put/cancel-payment-link/${payload.orderId}`,
            data: payload
        })
        resolve(response);
    }
    catch (error) {
        reject(error);
    }
});

export const apiConfirmWebHook = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/payment/post/confirm-web-hook/web-hook',
            data: payload
        })
        resolve(response);
    }
    catch (error) {
        reject(error);
    }
});

export const apiVerifyPaymentWebhookData = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/payment/get/verify-payment-web-hook-data/${payload}`,
        })
        resolve(response);
    }
    catch (error) {
        reject(error);
    }
});
