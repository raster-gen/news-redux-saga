import {createStore, compose, applyMiddleware} from "redux";
import {rootReducer} from "./reducers";
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./sagas";

const sagaMiddleWare = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(sagaMiddleWare))
);

export const store = configureStore({});

sagaMiddleWare.run(rootSaga)