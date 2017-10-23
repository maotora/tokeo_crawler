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
            state = state.map(log => {
                if(log.id === payload.id) {
                    log.deleted = true
                }

                return log
            })

            return state
        }

        case 'CLEAR_LOGS': {
            state = []
            return state
        }
    }

    return state
}
