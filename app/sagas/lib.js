import _ from 'lodash'
import moment from 'moment'
import fs from 'fs'
import FormData from 'form-data'
import toastr from 'toastr'
import { normalizePhone, normalizePrice } from '../components/Forms/commons/lib'

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
    }
    else if(Number(count) === 0) {
        return 'Occupied'
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

export function userLog(msg, head, condition) {
    return toastr[condition](msg, head)
}

export function assignObjects(dataArray) {
    let [dUsers, dProperties, dCustomers ] = [[], [], []]

    dataArray.forEach(obj => {
        if(obj.businessId) {
            dUsers = dUsers.concat(obj)
        } else if(obj.location) {
            dProperties = dProperties.concat(obj)
        } else if(obj.cardId) {
            dCustomers = dCustomers.concat(obj)
        }
    })

    return {
        dUsers, dCustomers, dProperties
    }
}

export function upsert(oldData, newData) {
    if(oldData.length <= 0) {
        return newData
    }
    else if(newData.length <= 0) {
        return oldData
    } else {
        const data = oldData.reduce((acc, oldObj) => {
            for(let i = 0; i < newData.length; i++) {
                if(oldObj.id === newData[i]['id']) { //- It's an existing data update it
                    const stateDataLastUpdate = oldObj.updatedAt || 0
                    const downloadDataLastUpdate = newData[i]['updatedAt'] || 0

                    if(downloadDataLastUpdate > stateDataLastUpdate) {
                        acc = _.uniqBy(acc.concat(newData[i]), 'id')
                    } else {
                        return 
                    }
                } else { //- It's a new data save both
                    acc = _.uniqBy(acc.concat(newData[i], oldObj),'id')
                }
            }
            return acc
        }, [])

        return _.uniqBy(data, 'id')
    }
}

export function nameObjects(obj) {
    if(obj.names) {
        return obj
    }

    obj.names = `${obj.firstName} ${obj.lastName}`
    return obj
}

export function normalizeData(arr) {
    return arr.map(obj => {
        if(obj.price) {
            obj.price = normalizePrice(obj.price)
        } else if(obj.phone) {
            obj.phone = normalizePhone(obj.phone)
        }

        return obj
    })
}

function checkResponseError(dataObj) {
    if(dataObj['errno']) {
        return false
    } else {
        return true
    }
}

export function checkResponse(response) {
    //- Response can be an array.
    //- Data can be an array.
    
    if(_.isArray(response)) {

        return response.reduce((acc, {data}) => {
            if(_.isArray(data)) {
                return data.reduce((acc, dataObj) => {
                    return checkResponseError(dataObj)
                }, false) //- End data reducer
            } else {
                return checkResponseError(data)
            }
        }, false) //- End response reducer 

    } else {
        if(_.isArray(response.data)) {
            return response.data.reduce((acc, data) => {
                return checkResponseError(data)
            }, false) //- End data reducer
        } else {
            return checkResponseError(response.data)
        }
    }
}

export function clearDeletedData(data) {
    return data.filter(dataObj => {
        if(!dataObj.deleted) {
            return dataObj
        }
    })
}
