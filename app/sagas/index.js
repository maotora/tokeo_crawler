import { takeLatest, all, select, put } from 'redux-saga/effects'

import {addUserSaga, editUserSaga, removeUserSaga} from './users'
import { editCustomerSaga, addCustomerSaga, removeCustomerSaga } from './customers'
import {editPropertySaga, removePropertySaga, addPropertySaga} from './property'
import { contractStatus, userLog } from './lib'

import { signUpSaga, loginSaga } from './auth'
import { emailContract, paymentSaga } from './payments'
import { synchronize, uploadData, downloadData, recoverPassword } from './sync'

export default function *() {
    try {
        yield all([
            takeLatest('EMAIL_CONTRACT', emailContract),
            takeLatest('DATA_SYNC', synchronize),
            takeLatest('DATA_UPLOAD', uploadData),
            takeLatest('DATA_DOWNLOAD', downloadData),
            takeLatest('RECOVER_PASSWORD', recoverPassword),

            takeLatest('UPDATE_CUSTOMER_EXPIRY', function *() {
                try{
                    const { customers } = yield select(state => state)
                    const updatedCustomers = customers.map(contractStatus)

                    yield put({type: 'EDIT_CUSTOMER', payload: {data: updatedCustomers}})
                    yield put({type: 'EXPIRY_UPDATE_COMPLETE'})
                } catch(err) {
                    userLog(err.message, 'Error, Updating Expiry', 'error')
                }
            }),

            takeLatest('TO_LOGIN', loginSaga),
            takeLatest('SIGNUP', signUpSaga),
            takeLatest('TO_PAYMENTS', paymentSaga),

            takeLatest('TO_ADD_USER', addUserSaga),
            takeLatest('TO_EDIT_USER', editUserSaga),
            takeLatest('REMOVE_USER', removeUserSaga),

            takeLatest('TO_ADD_PROPERTY', addPropertySaga),
            takeLatest('TO_EDIT_PROPERTY', editPropertySaga),
            takeLatest('TO_REMOVE_PROPERTY', removePropertySaga),

            takeLatest('TO_ADD_CUSTOMER', addCustomerSaga),
            takeLatest('TO_EDIT_CUSTOMER', editCustomerSaga),
            takeLatest('TO_REMOVE_CUSTOMER', removeCustomerSaga),
        ])
    } catch (err) {
        userLog(err.message, 'Fatal error in state', 'error')
    }
}
