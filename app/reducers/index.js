import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { loginReducer, usersReducer } from './user'
import { customerReducer, userReducer, propertyReducer } from './edits'
import customersReducer from './customers'
import PropertyReducer from './property'

export default combineReducers({
	users: usersReducer,
	customers: customersReducer,
    properties: PropertyReducer,
    login: loginReducer,
    router: routerReducer,
    form: formReducer,
    userTempEdits: userReducer,
    customerTempEdits: customerReducer,
    propertyTempEdits: propertyReducer,
})
