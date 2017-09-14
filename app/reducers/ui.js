const initialState = {
    selection: 'Dashboard',
    showStartup: 'true',
}

export default function reducer(state=initialState, {type, payload}) {
    switch(type) {
        case 'DASHBOARD_SELECTION': {
            state = {
                ...state,
                selection: payload.selection,
            }

            return state
        }

        case 'STARTUP_TOGGLE': {
            state = {
                ...state,
                showStartup: payload.startup
            }

            return state
        }
    }

    return state
}
