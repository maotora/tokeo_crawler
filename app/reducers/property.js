const initialPropertyState = [
    {
        name: null,
        owner: null,
        price: null,
        description: null,
        location: null,
        status: null,
        propertyType: null,
        propertyCount: null,
    }
]

export default function reducer(state=[], {type, payload}) {
    switch(type) {
        case 'ADD_PROPERTY': {
            state = state.concat({
                    name: payload.name,
                    owner: payload.owner,
                    price: payload.price,
                    description: payload.description,
                    location: payload.location,
                    status: payload.status,
                    propertyCount: payload.propertyCount,
                    propertyType: payload.propertyType
                })

            return state
        }

        case 'EDIT_PROPERTY': {
            state = payload.data

            return state
        }

        case 'REMOVE_PROPERTY': {
            return state.filter((property, index) => index !== payload.index)
        }
    }

    return state
}
