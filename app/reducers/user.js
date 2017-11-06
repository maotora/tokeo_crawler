import _ from 'lodash'

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
            return state.map(user => { 
                if(user.id === payload.id) {
                    user.deleted = true
                    user.updatedAt = _.now()
                }

                return user
            })
		}

        return state
	}

	return state
}
