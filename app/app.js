import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Routes from './routes'
import {store, history} from './store'
import { ConnectedRouter } from 'react-router-redux'

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'))

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Routes />
        </ConnectedRouter>
    </Provider>,
  rootElement
)
