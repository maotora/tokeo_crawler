import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { customerReducer, userReducer, propertyReducer } from './edits'
import UIReducer from './ui'
import usersReducer from './user'
import authReducer from './auth'
import customersReducer from './customers'
import PropertyReducer from './property'
import HistoryReducer from './history'

const appReducer = combineReducers({
	users: usersReducer,
	customers: customersReducer,
    properties: PropertyReducer,
    auth: authReducer,
    ui: UIReducer,
    router: routerReducer,
    form: formReducer,
    userTempEdits: userReducer,
    customerTempEdits: customerReducer,
    propertyTempEdits: propertyReducer,
    logs: HistoryReducer,
    registered: (state, {type, payload}) => {
        if(type === 'TOGGLE_REG') {
            console.log('payload ', payload)
            state = !!payload
        }
        return !!state
    },
    expiryUpdate: (state, {type}) => {
        if(type === 'EXPIRY_UPDATE_COMPLETE') {
            state = true
        }

        return !!state
    },
})

export default function rootReducer(state, action) {
    if(action.type === 'CLEAR_ALL_DATA') {
        state = undefined
    }

    return appReducer(state, action)
}
