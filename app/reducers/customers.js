import _ from 'lodash'

const initialCustomersState = [
    {
        firstName: null,
        lastName: null,
        names: null,
        product: null,
        email: null,
        phone: null,
        status: null,
        startDate: null,
        endDate: null,
    }
]

export default function reducer(state=initialCustomersState, {type, payload}) {
    switch(type) {
        case 'ADD_CUSTOMER': {
            state = _.concat(state, {
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
            })

            return state
        }

        case 'EDIT_CUSTOMER': {
            state = payload.data

            return state
        }

        case 'REMOVE_CUSTOMER': {
            _.remove(state, (customer, index) => { 
                return index === payload.index
            })
            return state
        }
    }

    return state || []

}
