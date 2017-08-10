import _ from 'lodash'

const initialCustomersState = [
    {
        firstName: null,
        lastName: null,
        names: null,
        product: null,
        email: null,
        phone: null,
        startDate: null,
        endDate: null,
    }
]

export default function reducer(state=initialCustomersState, {type, payload}) {
    switch(type) {
        case 'ADD_CUSTOMER': {
            state = state.concat({
                firstName: payload.firstName,
                lastName: payload.lastName,
                names: `${payload.firstName} ${payload.lastName}`,
                product: payload.product,
                email: payload.email,
                phone: payload.phone,
                startDate: payload.fromDate,
                endDate: payload.toDate,
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
