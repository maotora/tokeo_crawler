export default function reducer(state=[], {type, payload}) {
    switch(type) {
        case 'CREATE_LOG': {
            state = state.concat({
                id: payload.id,
                type: payload.type,
                data: payload.data,
                user: payload.user,
                time: payload.time,
            })

            return state
        }

        case 'DELETE_LOG': {
            state = state.filter(history => history.id === payload.id)

            return state
        }

        case 'CLEAR_LOGS': {
            state = undefined
            return state
        }
    }

    return state
}
