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

export const apiCreateCheckoutSession = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/stripe/post/create-check-out-session',
            data: payload
        })
        resolve(response);
    }
    catch (error) {
        reject(error);
    }
});

export const apiRetrieveASession = (id) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/stripe/get/retrieve-a-session/${id}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
});
