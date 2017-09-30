import _ from 'lodash'
import moment from 'moment'
import fs from 'fs'
import FormData from 'form-data'

const oneMonth = 2678400000
const [ twoMonths, threeMonths, fourMonths ] = [(oneMonth * 2), (oneMonth * 3), (oneMonth * 4)]

export function contractStatus(customer={}) {

    const daysLeft = Number(new Date(customer.endDate)) - _.now()
    let status

    if(daysLeft <= 0) {
        status = 'Contract Expired'
    }

    else if(daysLeft < oneMonth) {
        status = '1 month remain'
    }

    else if(daysLeft < twoMonths) {
        status = '2 months remain'
    }

    else if(daysLeft < threeMonths) {
        status = '3 months remain'
    }

    else if(daysLeft < fourMonths) {
        status = '4 months remain'
    }

    else {
        status = 'Payments Settled'
    }

    return {...customer, status: status}
}

//- TODO: should use moment sometime later. :-)
function experimental(customer={}) {
    let status

    if(moment().isBefore(customer.endDate)) {
        const date = moment().to(endDate)
        status = `Contract ends ${date}`
    } else {
        const date = moment().from(endDate)
        status = `Contract expired ${date}`
    }

    return {...customer, status: status}
}

export const statusGen = (count, property, all) => {
    if(Number(count) === Number(all)) {
        return 'Vacant'
    } else {
        return (count > 1) ? `${count} ${property}s left` : `${count} ${property} left`
    }
}

export const genId = () => _.times(32, () => _.random(35).toString(36)).join('')

export const logger = (type, user, data) => ({
    id: genId(),
    time: _.now(),
    data,
    type,
    user,
})

export function generateContract(url, customer) {
    const file = fs.createReadStream(url)
    const data = new FormData()

    data.append('contract', file)
    data.append('names', customer.names)
    data.append('email', customer.email)

    const headers = data.getHeaders()
    return {data, headers}
}
