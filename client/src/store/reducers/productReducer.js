import actionTypes from "../actions/actionTypes";

const initState = {
    productData: []
}

const productReducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.GET_PRODUCT:
            return {
                ...state,
                productData: action.productData || []
            }
        default:
            return state;
    }
}

export default productReducer