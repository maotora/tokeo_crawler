import { select, put, call, take } from 'redux-saga/effects'
import { clearDeletedData, normalizeData, userLog, nameObjects, upsert, assignObjects, logger, checkResponse } from './lib'
import { download, syncData, recover } from '../api'


export default function *synchronize() {
    try {
        const customers = yield select(state => state.customers)
        const properties = yield select(state => state.properties)
        const logs = yield select(state => state.logs)
        const users = yield select(state => state.users)
        const user = yield select(state => state.auth)

        const dataArray = [
            {type: 'user', data: users},
            {type: 'property', data: properties},
            {type: 'customer', data: customers},
            {type: 'logs', data: logs},
        ]

        const response = yield syncData(dataArray)
        const validResponse = checkResponse(response)

        if(validResponse) {
            const cCustomers = clearDeletedData(customers)
            const cUsers = clearDeletedData(users)
            const cProperties = clearDeletedData(properties)

            yield put({type: 'EDIT_USER', payload: {data: cUsers}})
            yield put({type: 'EDIT_PROPERTY', payload: {data: cProperties}})
            yield put({type: 'EDIT_CUSTOMER', payload: {data: cCustomers}})

            const logData = logger('SYNC_COMPLETE', user.id, {})
            yield put({type: 'CLEAR_LOGS'})
            yield put({type: 'CREATE_LOG', payload: logData})
            userLog('Uploading data successfuly completed.', 'Upload Complete', 'success')

        } else {
            throw new Error(response)
        }

    } catch(err) {
        userLog('Something went wrong while Uploading data.', 'Sync Error', 'error')
        const user = yield select(state => state.auth)
        const errorlogData = logger('SYNC_ERROR', user.id, err)
        yield put({type: 'CREATE_LOG', payload: errorlogData})
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
        userLog('Recovery email sent, check your inbox', 'Email sent', 'success')

        yield put({type: 'CREATE_LOG', payload: logData})

    } catch(err) {
        userLog('Something went wrong while sending recovery email.', 'Email Failure', 'error')
        const errorlogData = logger('RECOVERY_EMAIL_FAILED', null, err)
        yield put({type: 'CREATE_LOG', payload: errorlogData})
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
        const properties = normalizeData(upsert(sProperties, dProperties))
        const namedCustomers = normalizeData(customers.map(nameObjects))
        const namedUsers = normalizeData(users.map(nameObjects))
        const logData = logger('DOWNLOAD_DATA_SUCCESS', loggedInUser.id, {namedUsers, namedCustomers, properties})

        yield put({type: 'EDIT_USER', payload: {data: namedUsers}})
        yield put({type: 'EDIT_PROPERTY', payload: {data: properties}})
        yield put({type: 'EDIT_CUSTOMER', payload: {data: namedCustomers}})
        yield put({type: 'CREATE_LOG', payload: logData})
        userLog('Congrats, Import complete!', 'Import success', 'success')

    } catch(err) {
        userLog('Something went wrong while importing data', 'Import error', 'error')
        const loggedInUser = yield select(state => state.auth)
        const logData = logger('DOWNLOAD_DATA_FAIL', loggedInUser.id, err)
        yield put({type: 'CREATE_LOG', payload: logData})
    }
}
