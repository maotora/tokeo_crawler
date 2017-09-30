import _ from 'lodash'
import { select, put, call, take } from 'redux-saga/effects'
import { logger, statusGen, genId, contractStatus } from './lib'
import toastr from 'toastr'

export function *addCustomerSaga({payload}) {
    try {

        let properties = yield select(state => state.properties)
        const user = yield select(state => state.auth)
        properties = _.map(properties, (property, index) => {

            //- Reducing properties as customers are added.
            if(property.id === payload.property) {
                property.propertyCount = --property.propertyCount

                //- Occupied if all properties are occupied & ${count} left is some are left.
                if(property.propertyCount <= 0) {
                    property.status = 'Occupied'
                } else {
                    property.status = statusGen(property.propertyCount, property.propertyType, property.totalProperties)
                }
            }

            return property
        })

        const _id = genId()
        payload.createdAt = _.now()
        payload.id = _id
        const customers = contractStatus(payload)

        const logData = logger('ADD_CUSTOMER', user.id, payload)

        yield put({type: 'ADD_CUSTOMER', payload: customers})
        yield put({type: 'EDIT_PROPERTY', payload: {data: properties}})
        yield put({type: 'CREATE_LOG', payload: logData})
        toastr.success('Congratulations the user was added!')

        /* Perform some validations */
    } catch(err) {
        console.log(err)
    }
}

export function *removeCustomerSaga({payload}) {
    try {
        /* do some async stuff babe.. */

        const { id, propertyId } = payload
        let properties = yield select(state => state.properties)
        const user = yield select(state => state.auth)

        //- Increase properties when customer removed.
        properties = _.map(properties, (property, index) => {
            if(property.id === propertyId) {
                property.propertyCount = ++property.propertyCount
                property.status = statusGen(property.propertyCount, property.propertyType, property.totalProperties)
            }

            return property
        })

        const logData = logger('REMOVE_CUSTOMER', user.id, payload)

        yield put({type: 'EDIT_PROPERTY', payload: {data: properties}})
        yield put({type: 'REMOVE_CUSTOMER', payload: {id}})
        yield put({type: 'CREATE_LOG', payload: logData})
    } catch(err) {
        console.log(err)
    }
}

export function *editCustomerSaga({payload}) {
    try {
        let customerData = yield select(state => state.customers)
        let properties = yield select(state => state.properties)
        const user = yield select(state => state.auth)


        customerData = _.map(customerData, (customer, index) => {
            if(customer.id === payload.id) {
                //- Reduce & add the property that is left & that is going to be taken.
                if(customer.property !== payload.property || payload.status === 'Contract Terminated') {
                    properties = _.map(properties, (property, index) => {

                        if(property.id === customer.property) {
                            property.propertyCount = ++property.propertyCount
                            property.status = statusGen(property.propertyCount, property.propertyType, property.totalProperties)
                        }

                        if(property.id === payload.property) {
                            property.propertyCount = --property.propertyCount

                            if(property.propertyCount <= 0) {
                                property.status = 'Occupied'
                            } else {
                                property.status = statusGen(property.propertyCount, property.propertyType, property.totalProperties)
                            }
                        }

                        return property
                    })
                }

                /** Setting names here as it sorta can't be set directly in reducers **/
                payload.names = `${payload.firstName} ${payload.lastName}`
                payload.updatedAt = _.now()
                customer = payload
            }

            return customer
        })

        customerData = _.map(customerData, contractStatus)
        const logData = logger('EDIT_CUSTOMER', user.id, payload)

        yield put({type: 'EDIT_CUSTOMER', payload: {data: customerData}})
        yield put({type: 'EDIT_PROPERTY', payload: {data: properties}})
        yield put({type: 'CREATE_LOG', payload: logData})

    } catch(err) {
        console.log(err)
    }
}
