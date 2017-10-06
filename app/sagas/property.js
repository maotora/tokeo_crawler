import _ from 'lodash'
import { select, put, call, take } from 'redux-saga/effects'
import { userLog, logger, statusGen, genId } from './lib'

export function *addPropertySaga({payload}) {
    try {

        const user = yield select(state => state.auth)
        let property = payload
        property.totalProperties = Number(payload.propertyCount)
        property.id = genId()
        property.createdAt = _.now()

        if(property.status) {
            yield put({type: 'ADD_PROPERTY', payload: property})
        } else {
            property.status = 'Vacant'
            yield put({type: 'ADD_PROPERTY', payload: property})
        }

        const logData = logger('ADD_PROPERTY', user.id, payload)
        yield put({type: 'CREATE_LOG', payload: logData})
        userLog('Property successful added', 'Property Added', 'success')

        /* Perform some validations */
    } catch(err) {
        userLog('Something went wrong while adding a property', 'Property Add Error', 'error')
        const user = yield select(state => state.auth)
        const logData = logger('ADD_PROPERTY_ERROR', user.id, err)
        yield put({type: 'CREATE_LOG', payload: logData})
    }
}

export function *editPropertySaga({payload}) {
    try {

        const properties = yield select(state => state.properties)
        const user = yield select(state => state.auth)
        const customers = yield select(state => state.customers)

        let newerProperties = _.map(properties, property => {
            if(property.id === payload.values.id) {
                const totalCount = Number(payload.values.totalProperties)
                const diff = Number(totalCount) - Number(property.totalProperties)
                const numberOfCustomers = customers.filter(customer => customer && customer.property === property.id).length

                if(diff !== 0) {
                    const count = totalCount - numberOfCustomers

                    property = payload.values
                    property.propertyCount = count
                    property.totalProperties = totalCount
                    property.status = statusGen(count, payload.values.propertyType, totalCount)
                    property.updatedAt = _.now()

                } 
            }
            return property
        })

        const logData = logger('EDIT_PROPERTY', user.id, newerProperties)

        yield put({type: 'EDIT_PROPERTY', payload: {data: newerProperties}})
        yield put({type: 'CREATE_LOG', payload: logData})
        userLog('Property successful edited', 'Property Edit', 'success')

        /* Perform some validations */
    } catch(err) {
        userLog('Something went wrong while editing a property', 'Property Edit Error', 'error')
        const user = yield select(state => state.auth)
        const logData = logger('EDIT_PROPERTY_ERROR', user.id, err)
        yield put({type: 'CREATE_LOG', payload: logData})
    }
}

export function *removePropertySaga({payload}) {
    try {

        const user = yield select(state => state.auth)
        const logData = logger('REMOVE_PROPERTY', user.id, payload)

        yield put({type: 'REMOVE_PROPERTY', payload})
        yield put({type: 'CREATE_LOG', payload: logData})
        userLog('Property successful removed', 'Property Remove', 'success')

        /* Perform some validations */
    } catch(err) {
        userLog('Something went wrong while removing a property', 'Property Remove Error', 'error')
        const user = yield select(state => state.auth)
        const logData = logger('REMOVE_PROPERTY_ERROR', user.id, err)
        yield put({type: 'CREATE_LOG', payload: logData})
    }
}
