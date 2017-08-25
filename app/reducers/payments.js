const initialData = {
    firstName: null,
    lastName: null,
    product: null,
    phone: null,
    email: null,
    status: null,
    startDate: null,
    index: null,
    payments: [],
    endDate: null,
}

export default function(state=initialData, {type, payload}) {
    switch(type) {
        case 'TO_PAYMENTS': {
            state = {
                ...state,
                firstName: payload.firstName,
                lastName: payload.lastName,
                names: `${payload.firstName} ${payload.lastName}`,
                product: payload.product,
                email: payload.email,
                phone: payload.phone,
                status: payload.status,
                startDate: payload.startDate,
                endDate: payload.endDate,

            }
        }
    }

    return state
}
