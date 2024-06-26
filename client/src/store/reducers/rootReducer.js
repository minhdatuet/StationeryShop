import authReducer from "./authReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import productReducer from "./productReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";

const commonConfix = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfix,
    key: 'auth',
    whitelist: ['isLogged', 'token', 'msg']
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    user: userReducer,
    cart: cartReducer,
    product: productReducer,
})

export default rootReducer