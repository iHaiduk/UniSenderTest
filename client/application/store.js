/**
 * Created by igor on 11.02.17.
 */
import {applyMiddleware, createStore} from "redux";

import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import reducer from "./reducers";

const middleware = process.env.NODE_ENV === 'production' ? applyMiddleware(promise(), thunk) : applyMiddleware(promise(), thunk, logger());

export default createStore(reducer, middleware);
