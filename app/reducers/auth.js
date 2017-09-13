const initialLoginState = {
	username: null,
	password: null,
    logged: false,
    id: null,
}

export default function loginReducer(state=initialLoginState, {type, payload}) {
    switch(type) {
        case 'LOGIN': {
            return {
                id: payload.id,
                username: payload.username,
                logged: true,
            }
        }

        case 'LOGOUT': {
            return {
                id: null,
                username: null,
                logged: false,
            }
        }
    }

    return state
}
