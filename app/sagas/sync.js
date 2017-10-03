import { select, put, call, take } from 'redux-saga/effects'
import { userLog, nameObjects, upsert, assignObjects, logger } from './lib'
import { download, syncData, recover } from '../api'


export default function *synchronize() {
    try {
        const customers = yield select(state => state.customers)
        const properties = yield select(state => state.properties)
        const logs = yield select(state => state.logs)
        const users = yield select(state => state.users)
        const user = yield select(state => state.auth)

        const dataArray = [
            {type: 'customer', data: customers},
            {type: 'logs', data: logs},
            {type: 'user', data: users},
            {type: 'property', data: properties},
        ]

        const {data} = yield syncData(dataArray)
        const logData = logger('SYNC_COMPLETE', user.id, data)
        yield put({type: 'CREATE_LOG', payload: logData})

    } catch(err) {
        const user = yield select(state => state.auth)
        const errorlogData = logger('SYNC_ERROR', user.id, err)
        yield put({type: 'CREATE_LOG', payload: errorlogData})
        console.log(err.message)
    }
}

export function *recoverPassword() {
    try {
        const {values} = yield select(state => state.form.sign_in)
        const user = yield select(state => {
            return state.users.filter(({username}) => username === values.username)[0]
        })

        if(!user || user === null) throw new Error(`The username you entered is not valid. Please contact your providers!`)

        const {data} = yield recover(user)
        const logData = logger('RECOVERY_EMAIL_SENT', null, data)

        console.log(data)
        yield put({type: 'CREATE_LOG', payload: logData})

    } catch(err) {
        const errorlogData = logger('RECOVERY_EMAIL_FAILED', null, err)
        yield put({type: 'CREATE_LOG', payload: errorlogData})
        console.log(err.message)
    }
}

/*
 * Going to import data for users, customers & properties
 * 1st we need to compare data from state & online db & only save ones with changes.
 * If we have two colliding data we prioritize updatedAt field.
*/

export function *downloadData() {
    try {
        const sCustomers = yield select(state => state.customers)
        const sProperties = yield select(state => state.properties)
        const sUsers = yield select(state => state.users)
        const loggedInUser = yield select(state => state.auth)
        const {businessId} = sUsers[0]

        const {data} = yield download(businessId)
        const {dUsers, dProperties, dCustomers} = assignObjects(data)

        const customers = upsert(sCustomers, dCustomers)
        const users = upsert(sUsers, dUsers)
        const properties = upsert(sProperties, dProperties)
        const namedCustomers = customers.map(nameObjects)
        const namedUsers = users.map(nameObjects)

        yield put({type: 'EDIT_USER', payload: {data: namedUsers}})
        yield put({type: 'EDIT_CUSTOMER', payload: {data: namedCustomers}})
        yield put({type: 'EDIT_PROPERTY', payload: {data: properties}})
        userLog('Congrats, Import complete!', 'Import success', 'success')

    } catch(err) {
        userLog('Something went wrong while importing data', 'Import error', 'error')
    }
}
