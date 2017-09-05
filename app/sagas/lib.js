import _ from 'lodash'
import moment from 'moment'

const oneMonth = 2678400000
const [ twoMonths, threeMonths, fourMonths ] = [(oneMonth * 2), (oneMonth * 3), (oneMonth * 4)]

export function contractStatus(customer={}) {

    const daysLeft = Number(new Date(customer.endDate)) - _.now()
    let status
        console.log(twoMonths, threeMonths, fourMonths, daysLeft)

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
