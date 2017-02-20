import { Results, SampleDb } from './results-model'

export function saveResults(results) {
    
    if(results[0] && results[0].schoolName != undefined) {
        console.log(
            `Now Saving: ${results[0].schoolName} Number: ${results[0].schoolNumber}`
        )
        
        results.forEach(async (result) => {
            const resultsInstance = new Results(result)
            await resultsInstance.save()
        })
    }
}

export async function getSchools(queryParams) {
    
    const schools = await Results.find(queryParams).distinct('schoolNumber')

    return schools
}

export async function updateStudents(updater) {
    // await Results.find().exec(updater)
    const results = await SampleDb.find().exec(updater)

    return results
}
