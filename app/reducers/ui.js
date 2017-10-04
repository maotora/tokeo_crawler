const initialState = {
    selection: 'Dashboard',
    checked: 'on',
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

        case 'CHECKED_TOGGLE': {
            state = {
                ...state,
                checked: payload.checked
            }

            return state
        }
    }

    return state
}
