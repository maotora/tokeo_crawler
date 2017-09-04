import { select, put, call, take } from 'redux-saga/effects'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'

export function *addUserSaga({payload}) {
    try {
        /* 
         * Send to server and expect a 200 OK status
         * Agree to add user.
        */
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

        usersData = _.map(usersData, (user, index) => {
            if(index === payload.index) {
                delete payload.index
                user = payload
            }

            return user
        })

        yield put({type: 'EDIT_USER', payload: {data: usersData}})

    } catch(err) {
        console.log(err)
    }
}
