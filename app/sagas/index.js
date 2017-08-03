import { fork, takeLatest, all } from 'redux-saga/effects'
import {loginSaga, signUpSaga, removeUserSaga} from './users'
import { addCustomerSaga, removeCustomerSaga } from './customers'

export default function *() {
    yield all([
        takeLatest('LOGIN', loginSaga),
        takeLatest('SIGNUP', signUpSaga),
        takeLatest('REMOVE_USER', removeUserSaga),
        takeLatest('ADD_CUSTOMER', addCustomerSaga),
        takeLatest('REMOVE_CUSTOMER', removeCustomerSaga),
    ])
}
