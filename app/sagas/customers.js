import _ from 'lodash'
import { select, put, call, take } from 'redux-saga/effects'
import { contractStatus } from './lib'

export function *addCustomerSaga({payload}) {
    try {

        let properties = yield select(state => state.properties)
        properties = _.map(properties, (property, index) => {
            if(index === Number(payload.property)) {
                property.status = 'Occupied'
            }

            return property
        })

        const customers = contractStatus(payload)

        yield put({type: 'ADD_CUSTOMER', payload: customers})
        yield put({type: 'EDIT_PROPERTY', payload: {data: properties}})

        /* Perform some validations */
    } catch(err) {
        console.log(err)
    }
}

export function *removeCustomerSaga({payload}) {
    try {
        /* do some async stuff babe.. */

        const { customerIndex, propertyIndex } = payload
        let properties = yield select(state => state.properties)

        properties = _.map(properties, (property, index) => {
            if(index === Number(propertyIndex)) {
                property.status = 'Vacant'
            }

            return property
        })

        yield put({type: 'EDIT_PROPERTY', payload: {data: properties}})
        yield put({type: 'REMOVE_CUSTOMER', payload: {index: customerIndex}})
    } catch(err) {
        console.log(err)
    }
}

export function *editCustomerSaga({payload}) {
    try {
        let customerData = yield select(state => state.customers)
        let properties = yield select(state => state.properties)

        customerData = _.map(customerData, (customer, index) => {
            if(index === Number(payload.index)) {
                //- Assign Vacant & Occupied to a current property & selected property respectfully.
                if(customer.property !== payload.property) {
                    properties = _.map(properties, (property, index) => {
                        if(index === Number(customer.property)) {
                            property.status = 'Vacant'
                        }

                        if(index === Number(payload.property)) {
                            property.status = 'Occupied'
                        }

                        return property
                    })
                }

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
        yield put({type: 'EDIT_PROPERTY', payload: {data: properties}})

    } catch(err) {
        console.log(err)
    }
}
