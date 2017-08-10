import { select, put, call, take } from 'redux-saga/effects'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'

export function *loginSaga() {
    try {
        const username = yield select(state => state.login.username)
        const password = yield select(state => state.login.password)
		/* Should implement some validation stuff here */
    } catch(err) {
        console.log(err)
    }
}

export function *signUpSaga() {
	try {
		const { values } = yield select(state => state.form.add_admin) 
		console.log('values are ', values)
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
