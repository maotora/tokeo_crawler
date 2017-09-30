import { select, put, call, take } from 'redux-saga/effects'
import { generateContract } from './lib'
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

        const {contractUrl} = payload.payments.reduce((acc, curr) => {
            if(acc.contractCreated > curr.contractCreated) {
                return acc
            } else {
                return curr
            }
        })

        //- Not using this for a while
        const formData = generateContract(contractUrl, payload)

        const response = yield sendEmail(contractUrl, payload)
        console.log(response)

    } catch(err) {
        console.log(err)
    }
}
