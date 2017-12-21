import _ from 'lodash'
import { select, put, call, take } from 'redux-saga/effects'
import { Redirect } from 'react-router-dom'
import { userLog, logger, genId } from './lib'
import { privilegedAccess } from './utils'

export function *addUserSaga({payload}) {
    try {

        // yield call(privilegedAccess) --> Can be helpful but comment for now as it blocks signups.
        let user = payload

        //- Add businessId to every user.
        if(!user.businessId) {
            const users = yield select(state => state.users)
            const {businessId} = users.filter(user => user && user.businessId)[0]
            user.businessId = businessId
        }

        const loggedUser = yield select(state => state.auth)

        const logData = logger('ADD_USER', loggedUser.id, user)
        user.id = genId()
        user.createdAt = _.now()
        user.role = user.role || 'owner'

        yield put({type: 'ADD_USER', payload: user})
        yield put({type: 'CREATE_LOG', payload: logData})
        userLog('Congratulations, you\'ve added a new user!', 'User added', 'success')

    } catch(err) {
        userLog(err.message, 'User Add Error', 'error')
        const loggedUser = yield select(state => state.auth)
        const logData = logger('ADD_USER_ERROR', loggedUser.id, err)
        yield put({type: 'CREATE_LOG', payload: logData})
    }
}

export function *removeUserSaga({payload}) {
	try {
        yield call(privilegedAccess)
        const loggedUser = yield select(state => state.auth)
        const logData = logger('REMOVE_USER', loggedUser.id, payload)

        yield put({type: 'CREATE_LOG', payload: logData})
        userLog('Congratulations, you\'ve removed a user!', 'User Removed', 'success')
	} catch(err) {
        userLog(err.message, 'Error', 'error')
        const loggedUser = yield select(state => state.auth)
        const logData = logger('REMOVE_USER_ERROR', loggedUser.id, err)
        yield put({type: 'CREATE_LOG', payload: logData})
	}
}

export function *editUserSaga({payload}) {
    try {
        yield call(privilegedAccess)
        let usersData = yield select(state => state.users)
        const loggedUser = yield select(state => state.auth)

        usersData = _.map(usersData, user => {
            if(user.id === payload.id) {
                user = payload
                user.updatedAt = _.now()
            }

            return user
        })

        const logData = logger('EDIT_USER', loggedUser.id, payload)

        yield put({type: 'EDIT_USER', payload: {data: usersData}})
        yield put({type: 'CREATE_LOG', payload: logData})
        userLog('Congratulations, you\'ve edited a user!', 'User Edited', 'success')

    } catch(err) {
        userLog(err.message, 'Error', 'error')
        const loggedUser = yield select(state => state.auth)
        const logData = logger('EDIT_USER_ERROR', loggedUser.id, err)
        yield put({type: 'CREATE_LOG', payload: logData})
    }
}
