import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { customerReducer, userReducer, propertyReducer } from './edits'
import UIReducer from './ui'
import usersReducer from './user'
import authReducer from './auth'
import customersReducer from './customers'
import PropertyReducer from './property'

export default combineReducers({
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
})
