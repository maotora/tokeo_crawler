import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import rootReducer from './reducers'
import rootSaga from './sagas'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

const sagaMiddleware = createSagaMiddleware()
const history = createHistory()
const routingMiddleware = routerMiddleware(history)

const middlewares = [sagaMiddleware, logger, routingMiddleware];

// const composeEnhancers = (() => {
//     const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
//     if(process.env.NODE_ENV === 'development' && compose_) {
//         return compose_();
//     }
//     return compose;
// })();

// export default function configureStore(initialState) {
//     const enhancer = composeEnhancers(applyMiddleware(...middlewares));
//     const store = createStore(rootReducer, initialState, enhancer);

//     return store.run(rootSaga)
// }

const middleware = compose(applyMiddleware(...middlewares))
const store = createStore(rootReducer, {}, middleware)
sagaMiddleware.run(rootSaga)

export {
    history,
    store
}
