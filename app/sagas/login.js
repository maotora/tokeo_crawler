import { select, put, call, take } from 'redux-saga/effects'

export function *loginSaga() {
    try {
        const username = yield select(state => state.user.username)
        const password = yield select(state => state.user.password)
        yield put({type: 'LOGIN', payload: {username, password}})
    } catch(err) {
        console.log(err)
    }
}
