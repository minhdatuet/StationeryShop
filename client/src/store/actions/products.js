import actionTypes from './actionTypes';
import { apiGetAllProducts, apiGetBackpackInfo, apiGetProductById, apiGetProductsInCart } from '../../services/product';

export const getCart = (id) => async(dispatch) => {
    try {
        const response = await apiGetProductsInCart(id);
        // console.log(response)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CART,
                dataCart: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_CART,
                msg: response.data.msg,
                dataCart: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CART,
            dataCart: null,
            msg: error
        })
    }
}

export const getAllProducts = () => async(dispatch) => {
    try {
        const response = await apiGetAllProducts();
        // console.log(response)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PRODUCT,
                productData: response.data.response

            })
        } else {
            dispatch({
                type: actionTypes.GET_PRODUCT,
                msg: response.data.msg,
                productData: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRODUCT,
            productData: null,
            msg: error
        })
    }
}

