export default function usersReducer(state=[], {type, payload}) {
    switch(type) {
        case 'ADD_USER': {
			state = state.concat({
				id: payload.id,
				firstName: payload.firstName,
				lastName: payload.lastName,
                names: `${payload.firstName} ${payload.lastName}`,
				username: payload.username,
				password: payload.password,
				role: payload.role,
				phone: payload.phone,
				email: payload.email,
				businessId: payload.businessId,
                createdAt: payload.createdAt,
                updatedAt: payload.updatedAt,
            })

            return state
        }

        case 'EDIT_USER': {
            const { data } = payload
            state = data

            return state
        }

		case 'REMOVE_USER': {
            return state.filter(user => user.id !== payload.id)
		}

        return state
	}

	return state
}
