import actionTypes from './actionTypes';
import { apiGetBackpackInfo } from '../../services/product';

export const getBackpackInfo = () => async(dispatch) => {
    try {
        const response = await apiGetBackpackInfo();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_BACKPACK_INFO,
                dataBackpack: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_BACKPACK_INFO,
                msg: response.data.msg,
                dataBackpack: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_BACKPACK_INFO,
            dataBackpack: null,
            msg: error
        })
    }
}