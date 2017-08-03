import _ from 'lodash'

const initialUsersState = [
    {
        'names': 'Simoni Salikile',
        'phone': '+255742938281',
        'email': 'simon@mail.admin.yo',
        'role': 'Viewer',
        'username': 'ArchNoob',
        'password': 'kajsdfkljf',
    },
    {
        'names': 'Malinge Plahh',
        'phone': '+255742938281',
        'email': 'simon@mail.admin.yo',
        'role': 'Administrator',
        'username': 'ArchNoob',
        'password': '10291asjk',
    },
    {
        'names': 'Sumoki Salmin',
        'phone': '+255742938281',
        'email': 'simon@mail.admin.yo',
        'role': 'Administrator',
        'username': 'ArchNoob',
        'password': 'kajsdfkljasdklf',
    },
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

function usersReducer(state=initialUsersState, {type, payload}) {
    switch(type) {
        case 'SIGNUP': {
			state = state.concat({
				username: payload.username,
				password: payload.password,
				names: `${payload.lastName}, ${payload.firstName}`,
				role: payload.role,
				phone: payload.phone,
				email: payload.email,
			logged: true})
        }

		case 'REMOVE_USER': {
			_.remove(state, (user, index) => {
				return index === payload.index
			})
		}
	}

	return state
}

export {usersReducer, loginReducer}
