import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { loginReducer, usersReducer } from './user'
import customersReducer from './customers'

export default combineReducers({
    login: loginReducer,
	users: usersReducer,
    router: routerReducer,
    form: formReducer,
	customers: customersReducer,
})
