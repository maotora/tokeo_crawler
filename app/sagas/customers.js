import _ from 'lodash'
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

export function *editCustomerSaga({payload}) {
    try {
        let customerData = yield select(state => state.customers)

        customerData = _.map(customerData, (customer, index) => {
            if(index === payload.index) {
                delete payload.index
                customer = payload
            }

            return customer
        })

        yield put({type: 'EDIT_CUSTOMER', payload: {data: customerData}})

    } catch(err) {
        console.log(err)
    }
}
