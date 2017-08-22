import _ from 'lodash'

const thirtyDays = 2678400000
const tenDays = 864000000
const fiveDays = 432000000

export function contractStatus(customer={}) {

    const daysLeft = Number(new Date(customer.endDate)) - _.now()
    let status

        if(daysLeft <= 0) {
            status = 'Contract Expired'
        }

        else if(daysLeft < fiveDays) {
            status = '5 < Days remain'
        }

        else if(daysLeft < tenDays) {
            status = '10 < Days remain'
        }

        else if(daysLeft < thirtyDays) {
            status = '30 < Days remain'
        }

        else {
            status = 'Payments Settled'
        }

    return {...customer, status: status}
}
