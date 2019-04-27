import {
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    SAVE_COMMENT_SUCCESS,
    SAVE_COMMENT_ERROR,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_ERROR,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_ERROR,
    CHANGE_SEARCH_PARAMS_SUCCESS
} from "./../types/types";
const initialState = {
    products: [],
    fetchedProduct: null,
    comments: [],
    total: 0,
    perPage: 3,
    currentPage: 1,
    searchText: ''
};
function products(state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.data,
                total: action.total
            };
        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                error: action.message
            };
        case FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                fetchedProduct: action.data,
            };
        case FETCH_PRODUCT_ERROR:
            return {
                ...state,
                error: action.message,
            };
        case SAVE_COMMENT_SUCCESS:
            return {
                ...state,
                fetchedProduct: {
                    ...state.fetchedProduct,
                    comments: state.fetchedProduct.comments.concat(action.data)
                }
            };
        case SAVE_COMMENT_ERROR:
            return {
                ...state,
                error: action.message,
            };
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                fetchedProduct: {
                    ...state.fetchedProduct,
                    comments: state.fetchedProduct.comments.filter( comment => comment._id !== action.data._id )
                }
            };
        case DELETE_COMMENT_ERROR:
            return {
                ...state,
                error: action.message,
            };
        case CHANGE_SEARCH_PARAMS_SUCCESS:
            return {
                ...state,
                currentPage: action.page,
                searchText: action.searchText
            };
        default:
            return state;
    }
}
export default products;
