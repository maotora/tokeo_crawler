import { fork, takeLatest, all } from 'redux-saga/effects'
import {loginSaga, editUserSaga, signUpSaga, removeUserSaga} from './users'
import { editCustomerSaga, addCustomerSaga, removeCustomerSaga } from './customers'

export default function *() {
    yield all([
        takeLatest('LOGIN', loginSaga),
        takeLatest('SIGNUP', signUpSaga),
        takeLatest('TO_EDIT_USER', editUserSaga),
        takeLatest('TO_EDIT_CUSTOMER', editCustomerSaga),
        takeLatest('REMOVE_USER', removeUserSaga),
        takeLatest('ADD_CUSTOMER', addCustomerSaga),
        takeLatest('REMOVE_CUSTOMER', removeCustomerSaga),
    ])
}
