import { select, put, call, take } from 'redux-saga/effects'

export function *addCustomerSaga() {
    try {
        const {values} = yield select(state => state.form.add_customer)
        console.log('Customers values ', values)
        /* Perform some validations */
    } catch(err) {
        console.log(err)
    }
}

export function *removeCustomerSaga() {
    try {
        /* do some async stuff babe.. */
    } catch(err) {
        console.log(err)
    }
}
