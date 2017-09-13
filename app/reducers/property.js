const initialPropertyState = [
    {
        id: null,
        name: null,
        owner: null,
        price: null,
        description: null,
        location: null,
        status: null,
        propertyType: null,
        propertyCount: null,
        totalProperties: null,
    }
]

export default function reducer(state=[], {type, payload}) {
    switch(type) {
        case 'ADD_PROPERTY': {
            state = state.concat({
                    id: payload.id,
                    name: payload.name,
                    owner: payload.owner,
                    price: payload.price,
                    description: payload.description,
                    location: payload.location,
                    status: payload.status,
                    propertyType: payload.propertyType,
                    propertyCount: payload.propertyCount,
                    totalProperties: payload.totalProperties,
                })

            return state
        }

        case 'EDIT_PROPERTY': {
            state = payload.data

            return state
        }

        case 'REMOVE_PROPERTY': {
            return state.filter(property => property.id !== payload.id)
        }
    }

    return state
}
