import actionTypes from './actionTypes';
import { apiRegister, apiLogin, apiGoogleLogin, apiCompleteProfile} from '../../services/auth';
export const register = (payload) => async(dispatch) => {
    try {
        const response = await apiRegister(payload)
        console.log(response)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                data: response.data.token
            })
        } else {
            dispatch({
                type: actionTypes.REGISTER_FAIL,
                data: response.data.msg
            })
        }
        return response;
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: null
        })
    }
}


export const login = (payload) => async(dispatch) => {
    try {
        const response = await apiLogin(payload)
     
        console.log(response)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: response.data.token
            })
        } else {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
                data: response.data.msg
            })
        }
        return response;
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: null
        })
    }
}

export const logout = () => ({
    type: actionTypes.LOGOUT
})

export const googleLogin = (token) => async (dispatch) => {
    try {
        const response = await apiGoogleLogin(token);
        console.log(response);
        if (response?.data.needAdditionalInfo) {
            // Xử lý nếu cần thông tin bổ sung
        } else {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: response.data.accessToken
            });
        }
        return response;
    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: null
        });
        console.log('Google login failed!', error);
        throw error;
    }
};

export const completeProfile = (data) => async (dispatch) => {
    try {
        const response = await apiCompleteProfile(data);
        const { accessToken, user } = response.data;

        localStorage.setItem('accessToken', accessToken);

        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            data: accessToken
        });

        return response;
    } catch (error) {
        console.log('Complete profile failed!', error);
        throw error;
    }
};