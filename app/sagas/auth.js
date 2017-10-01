import { select, put, call, take } from 'redux-saga/effects'
import { logger } from './lib'
import { validateLicence } from '../api'

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

        //- TODO: Verification & download data LOGIC!
        const user = yield select(state => state.auth)
        const logData = logger('SIGNUP', user.id, payload)
        let { email, licence_email } = payload

        if(!email && !licence_email) {
            console.log('You must enter at least one email')
        }

        licence_email = licence_email || email
        email = email || licence_email

        //-Validation
        const macAddress = require('os').networkInterfaces()
        const {data} = yield validateLicence({email: licence_email, macAddress})

        if(data.validation) {
            yield put({type: 'TO_ADD_USER', payload})
            yield put({type: 'LOGIN', payload})
            yield put({type: 'CREATE_LOG', payload: logData})
        } else {
            throw new Error('Validation failed')
        }
	} catch(err) {
		console.log(err)
	}
}
