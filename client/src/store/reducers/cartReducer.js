import actionTypes from "../actions/actionTypes";

const initState = {
    cartData: []
}

const cartReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.GET_CART:
            return {
                ...state,
                cartData: action.dataCart || []
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                cartData: []
            }
        default:
            return state;
    }
}

export default cartReducer