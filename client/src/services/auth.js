import axiosConfig from '../axiousConfig'

export const apiLogin = (payload) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/auth/login',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})



export const apiRegister = (payload) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/auth/create',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGoogleLogin = (token) => new Promise(async (resolve, reject) => {
    try {
        console.log(token);
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/auth/google-login',
            data: { token }
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});


export const apiCompleteProfile = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/auth/complete-profile',
            data
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});