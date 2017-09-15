import { select, put, call, take } from 'redux-saga/effects'

export function *loginSaga({payload}) {
    try {
        const { username, password } = payload
        /* Client Validation & Logging */
        const users = yield select(state => state.users)
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

        if(logged) {
            yield put({type: 'LOGIN', payload: {username, id}})
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

        yield put({type: 'TO_ADD_USER', payload})
        yield put({type: 'LOGIN', payload})
	} catch(err) {
		console.log(err)
	}
}
