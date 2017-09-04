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

export default function usersReducer(state=[], {type, payload}) {
    switch(type) {
        case 'ADD_USER': {
			state = state.concat({
				firstName: payload.firstName,
				lastName: payload.lastName,
                names: `${payload.firstName} ${payload.lastName}`,
				username: payload.username,
				password: payload.password,
				role: payload.role,
				phone: payload.phone,
				email: payload.email,
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
