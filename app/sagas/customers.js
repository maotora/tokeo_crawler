import _ from 'lodash'
import { select, put, call, take } from 'redux-saga/effects'
import { contractStatus } from './lib'

const singularPlural = (count, property, all) => {
    if(Number(count) === Number(all)) {
        return 'Vacant'
    } else {
        return (count > 1) ? `${count} ${property}s left` : `${count} ${property} left`
    }
}

const genId = () => _.times(20, () => _.random(35).toString(36)).join('');

export function *addCustomerSaga({payload}) {
    try {

        let properties = yield select(state => state.properties)
        properties = _.map(properties, (property, index) => {

            //- Reducing properties as customers are added.
            if(index === Number(payload.property)) {

                property.propertyCount = --property.propertyCount

                //- Occupied if all properties are occupied.
                if(property.propertyCount <= 0) {
                    property.status = 'Occupied'
                } else {

                    //- Singular & Plural
                    property.status = singularPlural(property.propertyCount, property.propertyType, property.totalProperties)
                }
            }

            return property
        })

        payload.createdAt = _.now()
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

        //- Increase properties when customer removed.
        properties = _.map(properties, (property, index) => {
            if(index === Number(propertyIndex)) {
                property.propertyCount = ++property.propertyCount

                //- Singular & Plural
                property.status = singularPlural(property.propertyCount, property.propertyType, property.totalProperties)
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

                //- Reduce & add the property that is left & that is going to be taken.
                //- as the customer shifts from one property to another
                if(customer.property !== payload.property) {
                    properties = _.map(properties, (property, index) => {

                        if(index === Number(customer.property)) {
                            property.propertyCount = ++property.propertyCount
                            //- Singular & Plural
                            property.status = singularPlural(property.propertyCount, property.propertyType, property.totalProperties)
                        }

                        if(index === Number(payload.property)) {
                            property.propertyCount = --property.propertyCount

                            if(property.propertyCount <= 0) {
                                property.status = 'Occupied'
                            } else {
                                //- Singular & Plural
                                property.status = singularPlural(property.propertyCount, property.propertyType, property.totalProperties)
                            }
                        }

                        return property
                    })
                }

                delete payload.index
                /** Setting names here as it sorta can't be set directly in reducers **/
                payload.names = `${payload.firstName} ${payload.lastName}`
                payload.updatedAt = _.now()
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
