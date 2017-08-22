import _ from 'lodash'
import { select, put, call, take } from 'redux-saga/effects'
import { contractStatus } from './lib'

export function *addCustomerSaga({payload}) {
    try {

        const customers = contractStatus(payload)

        yield put({type: 'ADD_CUSTOMER', payload: customers})

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
                /** Setting names here as it sorta can't be set directly in reducers **/
                payload.names = `${payload.firstName} ${payload.lastName}`
                customer = payload
            }

            return customer
        })

        //-Giving contract status
        customerData = _.map(customerData, (customer, index) => {
            return contractStatus(customer)
        })

        yield put({type: 'EDIT_CUSTOMER', payload: {data: customerData}})

    } catch(err) {
        console.log(err)
    }
}
