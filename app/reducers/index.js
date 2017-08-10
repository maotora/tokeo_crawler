import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { loginReducer, usersReducer } from './user'
import { customerReducer, userReducer } from './edits'
import customersReducer from './customers'

export default combineReducers({
	users: usersReducer,
	customers: customersReducer,
    login: loginReducer,
    router: routerReducer,
    form: formReducer,
    userTempEdits: userReducer,
    customerTempEdits: customerReducer,
})
