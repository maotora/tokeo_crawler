const initialUsersState = [
    {
        firstName: null,
        lastName: null,
        names: null,
        username: null,
        password: null,
        role: null,
        phone: null,
        email: null,
    }
]

const initialLoginState = {
	username: null,
	password: null,
	logged: false
}

function loginReducer(state=initialLoginState, {type, payload}) {
    switch(type) {
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

function usersReducer(state=[], {type, payload}) {
    switch(type) {
        case 'SIGNUP': {
			state = state.concat({
				firstName: payload.firstName,
				lastName: payload.lastName,
                names: `${payload.firstName} ${payload.lastName}`,
				username: payload.username,
				password: payload.password,
				role: payload.role,
				phone: payload.phone,
				email: payload.email,
                logged: true
            })

            return state
        }

        case 'EDIT_USER': {
            const { data } = payload
            state = data

            return state
        }

		case 'REMOVE_USER': {
            return state.filter((user, index) => index !== payload.index)
		}

        return state
	}

	return state
}

export {usersReducer, loginReducer}
