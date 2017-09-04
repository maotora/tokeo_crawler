const initialLoginState = {
	username: null,
	password: null,
	logged: false
}

export default function loginReducer(state=initialLoginState, {type, payload}) {
    switch(type) {
        case 'LOGIN': {
            return {
                username: payload.username,
                password: payload.password,
                logged: true,
            }
        }

        case 'LOGOUT': {
            return {
                username: null,
                password: null,
                logged: false,
            }
        }
    }

    return state
}
