import { select, put, call, take } from 'redux-saga/effects'
import { Redirect } from 'react-router-dom'
import { logger, genId } from './lib'
import _ from 'lodash'

export function *addUserSaga({payload}) {
    try {
        /* 
         * Generate ID
         * Send to server and expect a 200 OK status
         * Agree to add user.
        */

    let user = payload
    const loggedUser = yield select(state => state.auth)

    const logData = logger('ADD_USER', loggedUser.id, payload)
    user.id = genId()

    yield put({type: 'ADD_USER', payload: user})
    yield put({type: 'CREATE_LOG', payload: logData})

    } catch(err) {
        console.log(err)
    }
}

export function *removeUserSaga() {
	try {
        const loggedUser = yield select(state => state.auth)
        const logData = logger('REMOVE_USER', loggedUser.id, payload)

        yield put({type: 'CREATE_LOG', payload: logData})
		/** Thinking of something async.. */
	} catch(err) {
		console.log(err)
	}
}

export function *editUserSaga({payload}) {
    try {
        let usersData = yield select(state => state.users)
        const loggedUser = yield select(state => state.auth)

        usersData = _.map(usersData, user => {
            if(user.id === payload.id) {
                user = payload
            }

            return user
        })

        const logData = logger('EDIT_USER', loggedUser.id, payload)

        yield put({type: 'EDIT_USER', payload: {data: usersData}})
        yield put({type: 'CREATE_LOG', payload: logData})

    } catch(err) {
        console.log(err)
    }
}
