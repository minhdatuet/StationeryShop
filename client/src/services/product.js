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
})

export const apiGetBackpackInfo = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/product/get/get-all-backpack-info',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetBookInfo = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/product/get/get-all-book-info',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetCasioInfo = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/product/get/get-all-casio-info',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetDesklampInfo = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/product/get/get-all-desklamp-info',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetNotebookInfo = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/product/get/get-all-notebook-info',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPenInfo = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/product/get/get-all-pen-info',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetSchoolSupplyInfo = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/product/get/get-all-school-supply-info',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetStationerySupplyInfo = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/product/get/get-all-stationery-supply-info',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetStoryBookInfo = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/product/get/get-all-story-book-info',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetTableAndChairInfo = () =>  new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/v1/product/get/get-all-table-and-chair-info',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})


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
})

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
})

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
})

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
})

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
})
