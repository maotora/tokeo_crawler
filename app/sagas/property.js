import _ from 'lodash'
import { select, put, call, take } from 'redux-saga/effects'
import { contractStatus } from './lib'

export function *addPropertySaga({payload}) {
    try {

        let property = payload
        if(property.status) {
            yield put({type: 'ADD_PROPERTY', payload})
        } else {
            property.status = 'Vacant'
            yield put({type: 'ADD_PROPERTY', payload: property})
        }

        /* Perform some validations */
    } catch(err) {
        console.log(err)
    }
}

export function *editPropertySaga({payload}) {
    try {

        const properties = yield select(state => state.properties)

        let newerProperties = _.map(properties, (property, index) => {
            if(index === payload.index) {
                console.log('Inside saga', payload.values)
                property = payload.values
            }
            return property
        })
        console.log('Outside saga', newerProperties)

        yield put({type: 'EDIT_PROPERTY', payload: {data: newerProperties}})

        /* Perform some validations */
    } catch(err) {
        console.log(err)
    }
}

export function *removePropertySaga({payload}) {
    try {

        yield put({type: 'REMOVE_PROPERTY', payload})

        /* Perform some validations */
    } catch(err) {
        console.log(err)
    }
}
