const initialState = {
    selection: 'Dashboard'
}

export default function reducer(state=initialState, {type, payload}) {
    switch(type) {
        case 'DASHBOARD_SELECTION': {
            state = {
                ...state,
                selection: payload
            }

            return state
        }
    }

    return state
}
