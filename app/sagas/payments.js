import { select, put, call, take } from 'redux-saga/effects'
import { logger, userLog, generateContract } from './lib'
import { sendEmail } from '../api'

export function *paymentSaga({payload}) {
    try {

        //- Get data from payload.
        //- Pass data to 
    } catch(err) {
        console.log(err)
    }
}

export function *emailContract({payload}) {
    try {

        const user = yield select(state => state.auth)
        const {contractUrl} = payload.payments.reduce((acc, curr) => {
            if(acc.contractCreated > curr.contractCreated) {
                return acc
            } else {
                return curr
            }
        })

        //- Not using this for a while
        // const formData = generateContract(contractUrl, payload)

        const response = yield sendEmail(contractUrl, payload)
        if(response.status < 300) {
            userLog('Email sent successfully!', 'Email sent', 'success')
        } else {
            userLog('Email not sent, check your connection', 'Email Not Sent', 'error')
        }

        const logData = logger('EMAIL_CONTRACT', user.id, payload)
        yield put({type: 'CREATE_LOG', payload: logData})

    } catch(err) {
        userLog('Something went wrong while sending the email', 'Email Failure', 'error')
        const user = yield select(state => state.auth)
        const logData = logger('EMAIL_CONTRACT_FAILED', user.id, err)
        yield put({type: 'CREATE_LOG', payload: logData})
    }
}
