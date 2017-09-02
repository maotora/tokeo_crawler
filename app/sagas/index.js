import { fork, takeLatest, all } from 'redux-saga/effects'
import {loginSaga, editUserSaga, signUpSaga, removeUserSaga} from './users'
import { editCustomerSaga, addCustomerSaga, removeCustomerSaga } from './customers'
import { paymentSaga } from './payments'
import {editPropertySaga, removePropertySaga, addPropertySaga} from './property'

export default function *() {
    yield all([
        takeLatest('LOGIN', loginSaga),
        takeLatest('SIGNUP', signUpSaga),

        takeLatest('TO_PAYMENTS', paymentSaga),
        takeLatest('TO_EDIT_USER', editUserSaga),
        takeLatest('REMOVE_USER', removeUserSaga),

        takeLatest('TO_ADD_CUSTOMER', addCustomerSaga),
        takeLatest('TO_EDIT_CUSTOMER', editCustomerSaga),
        takeLatest('TO_REMOVE_CUSTOMER', removeCustomerSaga),

        takeLatest('TO_ADD_PROPERTY', addPropertySaga),
        takeLatest('TO_EDIT_PROPERTY', editPropertySaga),
        takeLatest('TO_REMOVE_PROPERTY', removePropertySaga),
    ])
}
