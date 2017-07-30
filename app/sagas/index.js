import { fork, takeLatest, all } from 'redux-saga/effects'
import {loginSaga} from './login'

export default function *() {
    yield all([
        takeLatest('LOGIN', loginSaga),
    ])
}
