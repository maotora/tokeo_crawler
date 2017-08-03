import { select, put, call, take } from 'redux-saga/effects'

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
