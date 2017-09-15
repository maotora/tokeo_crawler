import { select, put, call, take } from 'redux-saga/effects'
import { Redirect } from 'react-router-dom'
import { genId } from './lib'
import _ from 'lodash'

export function *addUserSaga({payload}) {
    try {
        /* 
         * Generate ID
         * Send to server and expect a 200 OK status
         * Agree to add user.
        */

    let user = payload

    user.id = genId()
    yield put({type: 'ADD_USER', payload: user})

    } catch(err) {
        console.log(err)
    }
}

export function *removeUserSaga() {
	try {
		/** Thinking of something async.. */
	} catch(err) {
		console.log(err)
	}
}

export function *editUserSaga({payload}) {
    try {
        let usersData = yield select(state => state.users)

        usersData = _.map(usersData, user => {
            if(user.id === payload.id) {
                user = payload
            }

            return user
        })

        yield put({type: 'EDIT_USER', payload: {data: usersData}})

    } catch(err) {
        console.log(err)
    }
}
