import { select, put, call, take } from 'redux-saga/effects'
import { userLog, logger } from './lib'
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
            }
        })

        //- If user not successfully logged
        if(!logged) {userLog('Username or password is incorrect please try again', 'Login Failure', 'error')}

        const logData = logger('LOGIN', user.id, payload)
        if(logged) {
            userLog('Welcome to the dashboard!', 'Successful login', 'success')
            yield put({type: 'LOGIN', payload: {username, id}})
            yield put({type: 'CREATE_LOG', payload: logData})
        }
    } catch(err) {
        userLog('Something went wrong while login in please try again.', 'System Error', 'error')
    }
}

export function *signUpSaga({payload}) {
	try {

        //- TODO: Verification & download data LOGIC!
        const user = yield select(state => state.auth)
        let { email, licence_email } = payload

        if(!email && !licence_email) {
            userLog('You must enter at least the owner\'s email to signup', 'Signup Failed', 'error')
        }

        licence_email = licence_email || email
        email = email || licence_email

        //-Validation
        const macAddress = require('os').networkInterfaces()
        const {data} = yield validateLicence({email: licence_email, macAddress})
        const addedUser = {...payload, businessId: licence_email}

        if(data.validation) {
            userLog('Welcome to the dashboard!', 'Successful signup', 'success')
            const logData = logger('SIGNUP_SUCCESS', null, data)
            yield put({type: 'TO_ADD_USER', payload: addedUser})
            yield put({type: 'CREATE_LOG', payload: logData})
        } else {
            console.log(data)
            throw new Error(data.msg)
        }
	} catch(err) {
        userLog(`${err.message}`, 'Signup Failed', 'error')
        const logData = logger('SIGNUP_FAIL', null, err)
        yield put({type: 'CREATE_LOG', payload: logData})
	}
}
