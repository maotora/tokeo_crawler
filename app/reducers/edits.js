const userEdits = {
    username: null,
    password: null,
    role: null,
    phone: null,
    email: null,
    firstName: null,
    lastName: null,
    index: null,
}

const customerEdits = {
    firstName: null,
    lastName: null,
    product: null,
    phone: null,
    email: null,
    status: null,
    startDate: null,
    index: null,
    endDate: null,
}

export function userReducer(state=userEdits, {type, payload}) {
    switch(type) {
        case 'USER_EDITS': {
			const { data } = payload
			state = {
				...state,
				username: data.admin.username,
				password: data.admin.password,
				firstName: data.admin.firstName,
				lastName: data.admin.lastName,
				role: data.admin.role,
				phone: data.admin.phone,
				email: data.admin.email,
				index: data.index
            }
        }
    }

    return state
}

export function customerReducer(state=customerEdits, {type, payload}) {
    switch(type) {
        case 'CUSTOMER_EDITS': {
            const { data } = payload
            const { item } = data
            state = {
                firstName: item.firstName,
                lastName: item.lastName,
                names: data.names,
                product: item.product,
                phone: item.phone,
				status: item.status,
                email: item.email,
                startDate: item.startDate,
                endDate: item.endDate,
                index: data.index,
            }
        }
    }
    return state
}
