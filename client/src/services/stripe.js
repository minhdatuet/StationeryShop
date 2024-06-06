import axiosConfig from '../axiousConfig'

export const apiCreatePaymentIntent = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/stripe/post/make-payment',
        })
        resolve(response);
    }
    catch (error) {
        reject(error);
    }
});
