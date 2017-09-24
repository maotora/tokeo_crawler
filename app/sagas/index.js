import { fork, takeLatest, all } from 'redux-saga/effects'

import {addUserSaga, editUserSaga, removeUserSaga} from './users'
import { editCustomerSaga, addCustomerSaga, removeCustomerSaga } from './customers'
import {editPropertySaga, removePropertySaga, addPropertySaga} from './property'

import { signUpSaga, loginSaga } from './auth'
import { paymentSaga } from './payments'
import syncData from './sync'

export default function *() {
    yield all([
        takeLatest('DATA_SYNC', syncData),
        takeLatest('TO_LOGIN', loginSaga),
        takeLatest('SIGNUP', signUpSaga),
        takeLatest('TO_PAYMENTS', paymentSaga),

        takeLatest('TO_ADD_USER', addUserSaga),
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
