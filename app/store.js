import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import rootReducer from './reducers'
import rootSaga from './sagas'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import persistStorage from 'redux-localstorage'
import { composeWithDevTools } from 'redux-devtools-extension'

const sagaMiddleware = createSagaMiddleware()
const history = createHistory()
const routingMiddleware = routerMiddleware(history)

const middlewares = [sagaMiddleware, logger, routingMiddleware];

const middleware = composeWithDevTools(applyMiddleware(...middlewares), persistStorage())
const store = createStore(rootReducer, {}, middleware)
sagaMiddleware.run(rootSaga)

export {
    history,
    store
}
