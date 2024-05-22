import axiosConfig from '../axiousConfig'

export const apiGetProductInfoByCatalogId = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/product/get/get-product-info-by-catalog/${id}`
        })
        resolve(response);
    }
    catch (error) {
        reject(error);
    }
});


export const apiGetProductById = (id) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/product/get/get-product-by-id/${id}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

export const apiGetProductsInCart = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/product/get/get-products-in-cart/${id}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

export const apiAddToCart = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: `/api/v1/product/post/add-to-cart`,
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

export const apiGetAllProductInfoByCatalogId = (id) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/product/getAllProductsInfoByCatalogId/${id}`,
        })
        resolve(response)
    } catch (error) {
        reject(error)
        // console.log(error);
    }
});

export const apiGetProductByCatalogIdForAdmin = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/product/get/get-product-by-catalog-id-for-admin/${id}`
        })
        resolve(response);
    }
    catch (error) {
        reject(error);
    }
});

export const apiAdminDeleteProductById = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/v1/product/delete/admin-delete-product/${id}`
        })
        resolve(response);
    }
    catch (error) {
        reject(error);
    }
});

export const apiCreateNewProduct = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/product/post/create-new-product',
            data: payload
        })
        resolve(response);
    }
    catch (error) {
        reject(error);
    }
});

export const apiEditProduct = (payload) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/product/update/edit-product/${payload.id}`,
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

export const apiGetAllProducts = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/product/get/get-all-products'
           })
        resolve(response);
    }
    catch (error) {
        reject(error);
    }
});

export const apiGetFeedback = (payload) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/v1/product/getFeedbackByPIOId/${payload}`,
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

export const apiUpdateRate = (payload) =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/v1/product/update/editFeedback/${payload}`,
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
});

export const apiCreateNewFeedback = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/v1/product/post/createNewFeedback',
            data: payload
        })
        resolve(response);
    }
    catch (error) {
        reject(error);
    }
});
