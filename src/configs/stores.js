import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from "redux-thunk"
import ultiReducer from '../Utils/utilsSlice';
import courseReducer from '../features/Homepage/Utils/courseSlice';
import userReducer from '../features/User/Utils/userSlice';
import adminReducer from '../features/Admin/Utils/adminSlice';



const reducer = combineReducers({
    ultiReducer,
    courseReducer,
    userReducer,
    adminReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore (reducer, composeEnhancers(applyMiddleware(thunk)));
export default store;
