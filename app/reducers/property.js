import _ from 'lodash'

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
                    createdAt: payload.createdAt,
                    updatedAt: payload.updatedAt,
                })

            return state
        }

        case 'EDIT_PROPERTY': {
            state = payload.data

            return state
        }

        case 'REMOVE_PROPERTY': {
            return state.map(property => {
                if(property.id === payload.id) {
                    property.deleted = true
                    property.updatedAt = _.now()
                }

                return property
            })
        }
    }

    return state
}
