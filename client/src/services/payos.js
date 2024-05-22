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
