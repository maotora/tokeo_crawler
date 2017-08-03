import _ from 'lodash'

const initialCustomersState = [
    {
        name: 'Maotora Makweba',
        product: 'House',
        email: 'somecustomer@mail.com',
        phone: '+25534823473',
    },
    {
        name: 'Maotora Makweba',
        product: 'House',
        email: 'somecustomer@mail.com',
        phone: '+25534823473',
    },
    {
        name: 'Maotora Makweba',
        product: 'House',
        email: 'somecustomer@mail.com',
        phone: '+25534823473',
    }
]

export default function reducer(state=initialCustomersState, {type, payload}) {
    switch(type) {
        case 'ADD_CUSTOMER': {
            state = state.concat({
                name: `${payload.firstName} ${payload.lastName}`,
                product: payload.product,
                email: payload.email,
                phone: payload.phone,
                startDate: payload.fromDate,
                endDate: payload.toDate,
            })
        }

        case 'REMOVE_CUSTOMER': {
            _.remove(state, (customer, index) => { 
                return index === payload.index
            })
        }
    }

    return state
}
