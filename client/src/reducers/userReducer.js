import {
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    SIGN_OUT_SUCCESS,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    FETCH_USER_PRODUCTS_SUCCESS,
    FETCH_USER_PRODUCTS_ERROR,
    EDIT_USER_PRODUCT_SUCCESS,
    EDIT_USER_PRODUCT_ERROR,
    DELETE_USER_PRODUCT_SUCCESS,
    DELETE_USER_PRODUCT_ERROR,
    SAVE_USER_PRODUCT_SUCCESS,
    SAVE_USER_PRODUCT_ERROR,
    UPDATE_USER_AVATAR_SUCCESS,
    UPDATE_USER_AVATAR_ERROR,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
} from "../types/types";
const initialState = {
    authenticated: false,
    user: {},
    products: []
};
function users(state = initialState, action) {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                authenticated: true,
            };
        case SIGN_IN_ERROR:
            return {
                ...state,
                authenticated: false
            };
        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                authenticated: false
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                authenticated: true,
            };
        case SIGNUP_ERROR:
            return {
                ...state,
                authenticated: false
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                user: action.data
            };
        case FETCH_USER_ERROR:
            return {
                ...state,
            };
        case FETCH_USER_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.data
            };
        case FETCH_USER_PRODUCTS_ERROR:
            return {
                ...state,
            };
        case SAVE_USER_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.concat([action.data])
            };
        case SAVE_USER_PRODUCT_ERROR:
            return {
                ...state,
                error: action.message
            };
        case EDIT_USER_PRODUCT_SUCCESS:
            const copyProducts = state.products.slice();
            const index = copyProducts.findIndex(product => product._id === action.data._id);
            if (index >= 0) {
                copyProducts[index] = action.data;
            }
            return {
                ...state,
                products: copyProducts
            };
        case EDIT_USER_PRODUCT_ERROR:
            return {
                ...state,
                error: action.error
            };
        case DELETE_USER_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.filter(product => product._id !== action.data),
            };
        case DELETE_USER_PRODUCT_ERROR:
            return {
                ...state,
                error: action.error
            };
        case UPDATE_USER_AVATAR_SUCCESS:
            return {
                ...state,
                user: action.data
            };
        case UPDATE_USER_AVATAR_ERROR:
            return {
                ...state
            };
        default:
            return state;
    }
}
export default users;
