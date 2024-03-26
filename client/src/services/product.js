import axiosConfig from '../axiousConfig'

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
