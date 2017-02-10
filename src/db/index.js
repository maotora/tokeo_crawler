import Results from './results-model'

export function saveResults(results) {
    
    if(results[0]) {
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
    
    const schools = await Results.find(queryParams).distinct('schoolNumber', (err, schoolsList) => {
        if(err) { return err }

        return schoolsList
    })

    return schools
}
