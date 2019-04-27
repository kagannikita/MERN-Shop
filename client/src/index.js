import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/reducers';
import { BrowserRouter } from 'react-router-dom'
import Main from './Main';
import {
    SIGN_IN_SUCCESS
} from "./types/types";
const store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    ));
if (localStorage.getItem('token')) {
    store.dispatch({
        type: SIGN_IN_SUCCESS
    })
}
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
