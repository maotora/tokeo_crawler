const initialCustomersState = [
    {
        firstName: null,
        lastName: null,
        names: null,
        property: null,
        email: null,
        phone: null,
        status: null,
        startDate: null,
        endDate: null,
        payments: [],
    }
]

export default function reducer(state=[], {type, payload}) {
    switch(type) {
        case 'ADD_CUSTOMER': {
            state = state.concat({
                firstName: payload.firstName,
                lastName: payload.lastName,
                names: `${payload.firstName} ${payload.lastName}`,
                property: payload.property,
                email: payload.email,
                phone: payload.phone,
                status: payload.status,
                startDate: payload.startDate,
                endDate: payload.endDate,
                payments: payload.payments,
            })

            return state
        }

        case 'EDIT_CUSTOMER': {
            state = payload.data

            return state
        }

        case 'REMOVE_CUSTOMER': {
            return state.filter((customer, index) => index !== payload.index)
        }
    }

    return state

}
