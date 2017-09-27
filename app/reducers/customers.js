const initialCustomersState = [
    {
        id: null,
        cardId: null,
        id_type: null,
        firstName: null,
        lastName: null,
        names: null,
        property: null,
        email: null,
        phone: null,
        noticePeriod: null,
        status: null,
        startDate: null,
        endDate: null,
        payments: [],
        createdAt: null,
        updatedAt: null,
    }
]

export default function reducer(state=[], {type, payload}) {
    switch(type) {
        case 'ADD_CUSTOMER': {
            state = state.concat({
                id: payload.id,
                cardId: payload.cardId,
                id_type: payload.id_type,
                firstName: payload.firstName,
                lastName: payload.lastName,
                names: `${payload.firstName} ${payload.lastName}`,
                property: payload.property,
                email: payload.email,
                phone: payload.phone,
                noticePeriod: payload.noticePeriod,
                status: payload.status,
                startDate: payload.startDate,
                endDate: payload.endDate,
                payments: payload.payments,
                createdAt: payload.createdAt,
                updatedAt: payload.updatedAt,
            })

            return state
        }

        case 'EDIT_CUSTOMER': {
            state = payload.data

            return state
        }

        case 'REMOVE_CUSTOMER': {
            return state.filter(customer => customer.id !== payload.id)
        }
    }

    return state

}
