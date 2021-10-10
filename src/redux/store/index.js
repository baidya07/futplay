import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
import { applyMiddleware, createStore, compose } from "redux";
import { createBrowserHistory } from 'history';
import { routerReducer, routerMiddleware } from 'react-router-redux'

export const history = createBrowserHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 export default createStore(
   rootReducer,
 

    composeEnhancers(
      applyMiddleware(thunk,routerMiddleware(history)),
    ),
  );

