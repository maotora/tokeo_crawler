import _ from 'lodash'
import { select, put, call, take } from 'redux-saga/effects'

export function *privilegedAccess() {
    const authdUser = yield select(state => state.auth)
    const users = yield select(state => state.users)
    const user = users.find(obj => obj.id === authdUser.id)

    if(user.role === 'moderator') {
        throw new Error('Moderators cannot perform this action')
    }

}
