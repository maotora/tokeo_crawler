import { select, put, call, take } from 'redux-saga/effects'
import { logger } from './lib'

export function *loginSaga({payload}) {
    try {
        const { username, password } = payload
        /* Client Validation & Logging */
        const users = yield select(state => state.users)
        const user = yield select(state => state.auth)

        var logged, id = false

        users.forEach(user => {
            if(username === user.username && password === user.password) {
                logged = true
                id = user.id
            } else {
                console.log(`Username ${username} & Password ${password}
                have not been identified
                Please SignUp`)
            }
        })

        const logData = logger('LOGIN', user.id, payload)
        if(logged) {
            yield put({type: 'LOGIN', payload: {username, id}})
            yield put({type: 'CREATE_LOG', payload: logData})
        }
    } catch(err) {
        console.log(err)
    }
}

export function *signUpSaga({payload}) {
	try {

        //- TODO: LICENSE logic!
        //- If not licensed don't yield LOGIN babe.
        //- NO need generating ID it's already in TO_ADD_USER
        const user = yield select(state => state.auth)
        const logData = logger('SIGNUP', user.id, payload)

        yield put({type: 'TO_ADD_USER', payload})
        yield put({type: 'LOGIN', payload})
        yield put({type: 'CREATE_LOG', payload: logData})
	} catch(err) {
		console.log(err)
	}
}
