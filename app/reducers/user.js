const initialState = {
    username: null,
    password: null,
    logged: false,
}

function reducer(state=initialState, {type, payload}) {
    switch(type) {
        case 'LOGIN_CLICK': {
            return {
                ...state,
                username: payload.username,
                password: payload.password,
                logged: true,
            }
        }

        case 'LOGIN': {
            return {
                ...state,
                username: payload.username,
                password: payload.password,
                logged: true,
            }
        }

        case 'LOGOUT': {
            return {
                ...state,
                username: null,
                password: null,
                logged: false,
            }
        }
    }

    return state
}

export default reducer
