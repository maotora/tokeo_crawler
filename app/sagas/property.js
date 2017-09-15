import _ from 'lodash'
import { select, put, call, take } from 'redux-saga/effects'
import { statusGen, genId } from './lib'

export function *addPropertySaga({payload}) {
    try {

        let property = payload
        property.totalProperties = Number(payload.propertyCount)
        property.id = genId()

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

        let newerProperties = _.map(properties, property => {
            if(property.id === payload.values.id) {
                const totalCount = payload.values.propertyCount
                const diff = Number(totalCount) - Number(property.totalProperties)

                //- TODO: Fucking thing, I'll do it later.
                if(diff !== 0) {
                    const count = diff + Number(property.propertyCount)
                    console.log('count is ', count)

                    property = payload.values
                    property.propertyCount = count
                    property.totalProperties = totalCount
                    property.status = statusGen(count, payload.values.propertyType, totalCount)

                    return property
                } else {
                    console.log('Nothing changed')
                }

                property = payload.values
            }
            return property
        })


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
