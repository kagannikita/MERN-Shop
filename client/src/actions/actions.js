import {
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    SAVE_USER_PRODUCT_SUCCESS,
    SAVE_USER_PRODUCT_ERROR,
    EDIT_USER_PRODUCT_SUCCESS,
    EDIT_USER_PRODUCT_ERROR,
    DELETE_USER_PRODUCT_SUCCESS,
    DELETE_USER_PRODUCT_ERROR,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_ERROR,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    SIGN_OUT_SUCCESS,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    FETCH_USER_PRODUCTS_SUCCESS,
    FETCH_USER_PRODUCTS_ERROR,
    UPDATE_USER_AVATAR_SUCCESS,
    UPDATE_USER_AVATAR_ERROR,
    SAVE_COMMENT_SUCCESS,
    SAVE_COMMENT_ERROR,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_ERROR,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    CHANGE_SEARCH_PARAMS_SUCCESS,

} from "./../types/types";
import axios from 'axios';
const getHeaders = () => {
    return {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
};
export const fetchProducts = (perPage, currentPage, searchText, successCallback) => (dispatch, getState) => {
    axios(`http://localhost:3001/api/products?perPage=${perPage}&currentPage=${currentPage}&searchText=${searchText || ""}`)
        .then((success) => {
            dispatch({
                type: FETCH_PRODUCTS_SUCCESS,
                data: success.data.products,
                total: success.data.total,
            });
            if(successCallback) {
                successCallback();
            }
        })
        .catch(function(error) {
            console.log(error);
            dispatch({
                type: FETCH_PRODUCTS_ERROR,
                error: error.message || "ERROR HAPPENED"
            })
        })
};
export const fetchProduct = (id) => (dispatch) => {
    axios('http://localhost:3001/api/products/' + id)
        .then((success) => {
            dispatch({
                type: FETCH_PRODUCT_SUCCESS,
                data: success.data.product
            })
        })
        .catch(function(error) {
            dispatch({
                type: FETCH_PRODUCT_ERROR,
                error: error.message || "ERROR HAPPENED"
            })
        })
};
export const signin = (login, password, successCallback, errorCallback) => (dispatch) => {
    axios.post('http://localhost:3001/api/auth/sign-in', {
        login: login,
        password: password
    }).then((success) => {
        const token = success.data.token;
        localStorage.setItem('token', token);
        dispatch({
            type: SIGN_IN_SUCCESS,
            data: token
        });
        successCallback();
    }).catch((error) => {
        dispatch({
            type: SIGN_IN_ERROR
        });
        if (error.response.status == 401) {
            errorCallback(error.response.data);
        } else {
            errorCallback("Internal server error");
        }
    })
};
export const signOut = (successCallback) => {
    localStorage.removeItem('token');
    successCallback();
    return {
        type: SIGN_OUT_SUCCESS
    }
};
export const fetchUser = () => (dispatch) => {
    axios.get('http://localhost:3001/api/profile', {
        headers: {
            "Authorization" : "Bearer " + localStorage.getItem('token')
        }
    }).then(response => {
        const user = response.data;
        dispatch({
            type: FETCH_USER_SUCCESS,
            data: user
        })
    }).catch(error => {
        console.log(error);
        dispatch({
            type: FETCH_USER_ERROR
        })
    });
};
export const fetchUserProducts = () => (dispatch) => {
    axios.get('http://localhost:3001/api/profiles/products', {
        headers: {
            "Authorization" : "Bearer " + localStorage.getItem('token')
        }
    }).then(response => {
        const products = response.data.products;
        dispatch({
            type: FETCH_USER_PRODUCTS_SUCCESS,
            data: products
        });
    }).catch(error=> {
        console.log(error);
        dispatch({
            type: FETCH_USER_PRODUCTS_ERROR
        });
    });
};
export const saveUserProduct = (addName, addDescription,addCountry,addPrice,addCurrency, saveImage, changeState) => (dispatch) => {
    const fd = new FormData();
    fd.append('name', addName);
    fd.append('description', addDescription);
    fd.append('country', addCountry);
    fd.append('price', addPrice);
    fd.append('currency', addCurrency);
    fd.append('file', saveImage);
    axios.post('http://localhost:3001/api/profiles/products', fd, {
        headers: {
            "Authorization" : "Bearer " + localStorage.getItem('token')
        }
    }).then((success) => {
        const savedProduct = success.data.savedProduct;
        dispatch({
            type: SAVE_USER_PRODUCT_SUCCESS,
            data: savedProduct
        });
        changeState()
    }).catch((error) => {
        console.log(error);
        dispatch({
            type: SAVE_USER_PRODUCT_ERROR,
            message: error.response.message || 'INTERNAL SERVER ERROR'
        })
    });
};
export const editUserProduct = (id, newProduct, changeState) => (dispatch) => {
    const fd = new FormData();
    fd.append('name', newProduct.name);
    fd.append('description', newProduct.description);
    fd.append('country', newProduct.country);
    fd.append('price', newProduct.price);
    fd.append('currency', newProduct.currency);
    fd.append('file', newProduct.file);
    axios.put('http://localhost:3001/api/profiles/products/' + id, fd, {
        headers: {
            "Authorization" : "Bearer " + localStorage.getItem('token')
        }
    })
        .then((success) => {
            const updatedProduct = success.data.updatedProduct;
            dispatch({
                type: EDIT_USER_PRODUCT_SUCCESS,
                data: updatedProduct,
            });
            changeState();
        })
        .catch((error) => {
            console.log(error);
            dispatch({
                type: EDIT_USER_PRODUCT_ERROR,
                error: error.message || "ERROR HAPPENED"
            });
        });
};
export const deleteUserProduct = (id) => (dispatch) => {
    axios.delete('http://localhost:3001/api/profiles/products/' + id, {
        headers: {
            "Authorization" : "Bearer " + localStorage.getItem('token')
        }
    })
        .then((success) => {
            dispatch({
                type: DELETE_USER_PRODUCT_SUCCESS,
                data: id,
            });

        }).catch((error) => {
        console.log(error);
        dispatch({
            type: DELETE_USER_PRODUCT_ERROR,
            error: error.message || "ERROR HAPPENED"
        });
    });
};
export const updateUserAva = (file) => (dispatch) => {
    const fd = new FormData();
    fd.append("file", file);
    axios.post('http://localhost:3001/api/profile/ava', fd, {
        headers: {
            "Authorization" : "Bearer " + localStorage.getItem('token')
        }
    }).then(success => {
        dispatch({
            type: UPDATE_USER_AVATAR_SUCCESS,
            data: success.data
        });
    }).catch(error => {
        console.log(error);
        dispatch({
            type: UPDATE_USER_AVATAR_ERROR
        })
    })
};
export const saveComment = (productId, commentText, successCallback) => (dispatch) => {
    const data = {
        text: commentText,
    };
    axios.post(`http://localhost:3001/api/products/${productId}/comments`, data, {
        headers: getHeaders()
    }).then((success) => {
        dispatch({
            type: SAVE_COMMENT_SUCCESS,
            data: success.data
        });
        successCallback();
    }).catch((error) => {
        console.log(error);
        dispatch({
            type: SAVE_COMMENT_ERROR,
            error: error.response && error.response.error || 'INTERNAL_SERVER'
        });
    });
};
export const deleteComment = (productId, commentId) => dispatch => {
    axios.delete(`http://localhost:3001/api/products/${productId}/comments/${commentId}`, {
        headers: getHeaders()
    }).then((success) => {
        dispatch({
            type: DELETE_COMMENT_SUCCESS,
            data: success.data
        })
    }).catch((error) => {
        console.log(error);
        dispatch({
            type: DELETE_COMMENT_ERROR,
            error: error.response && error.response.error || 'INTERNAL_SERVER'
        });
    });
};

export const signup = (firstName, lastName,
                       email, password,login,phonenumber,
                       success, fail) => (dispatch) => {
    axios.post('http://localhost:3001/api/auth/sign-up', {
        firstName,
        lastName,
        email,
        password,
        login,
        phonenumber
    }).then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({
            type: SIGNUP_SUCCESS
        });
        success();
    }).catch((error) => {
        console.log(error);
        dispatch({
            type: SIGNUP_ERROR
        });
        console.log('123 ',error.response);
        fail(error.response && error.response.data.error)
    });
};
export const changeSearchParams = (page, searchText) => {
    return {
        type: CHANGE_SEARCH_PARAMS_SUCCESS,
        page: page,
        searchText: searchText
    }
};
