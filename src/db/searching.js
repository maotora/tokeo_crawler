import _ from 'lodash'
import { Results } from './results-model'

export async function getStudents(params, {limitVal, sortVal}) {
    
    if(_.isUndefined(limitVal) != true && _.isUndefined(sortVal) != true) {
        limitVal = Number(limitVal)
        const students = await Results.find(params).limit(limitVal).sort(sortVal)
        return students
    } else if(_.isUndefined(sortVal) != true && _.isUndefined(limitVal)) {
        const students = await Results.find(params).sort(sortVal)
        return students
    } else if(_.isUndefined(limitVal) != true && _.isUndefined(sortVal)) {
        limitVal = Number(limitVal)
        const students = await Results.find(params).limit(limitVal)
        return students
    } else {
        const students = await Results.find(params)
        return students
    }
}
