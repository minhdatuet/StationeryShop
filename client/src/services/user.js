import axiosConfig from '../axiousConfig'

export const apiGetUser = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/user/get/user',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetLeaders = (type) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/user/get/leaders/${type}`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetAllUsers = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/user/get/all',
        })
        console.log(response)
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiDeleteEmployee = (id) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/user/delete/${id}`,
        })
        console.log(response)
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


export const apiUpdateUserById = (payload) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/user/update/${payload.id}`,
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetAllCustomerInfo = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/user/get/get-all-customer-info'
        })
        resolve(response);
    }
    catch (error) {
        reject(error);
    }
    
});

export const apiGetDetailInfoByID = (uId) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/user/get/getDetailInfoByID/${uId}`
        })
        resolve(response);
    }
    catch (error) {
        reject(error);
    }
});

export const apiDeleteCustomerAccountById = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/user/delete-customer-account/${id}`
        })
        resolve(response);
    }
    catch (error) {
        reject(error);
    }
});

export const apiModifyCustomerAccount = (payload) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/user/modify-customer-account/${payload.id}`,
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

export const apiGetAccountByPhone = (phone) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/user/get/get-account-by-phone/${phone}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

export const apiCreateAccountForAnotherAdmin = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/v1/user/post/create-account-for-another-admin`,
            data: payload

        })
        resolve(response);
    }
    catch (error) {
        reject(error);
    }

});


export const apiUpdateUserInPersonalPage = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/v1/user/post/updateUserInPersonalPage`,
            data: payload

        })
        resolve(response);
    }
    catch (error) {
        reject(error);
    }

});
