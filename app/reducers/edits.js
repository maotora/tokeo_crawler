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
    id: null
}

const propertyEdits = {
    id: null
}

export function userReducer(state=userEdits, {type, payload}) {
    switch(type) {
        case 'USER_EDITS': {
            state = {id: payload.id}
        }
    }

    return state
}

export function customerReducer(state=customerEdits, {type, payload}) {
    switch(type) {
        case 'CUSTOMER_EDITS': {
            state = {id: payload.id}

            return state
        }
    }
    return state
}

export function propertyReducer(state=propertyEdits, {type, payload}) {
    switch(type) {
        case 'PROPERTY_EDITS': {
            state = {id: payload.id}

            return state
        }
    }
    return state
}
