import fs from 'fs'
import request from 'superagent'
import jsdom from 'jsdom'
import _ from 'lodash'
import firstTable from './../lib/first-table'
import { getResultsLinks } from './../lib/misc'
import { saveResults, getSchools } from './../db/'

const jquery = fs.readFileSync(__dirname + '/jquery.js', 'utf-8')

function getSchoolsLink(mainLink, cb, fail) {
    let schoolLinks = []

    request.get(mainLink).end((err, res) => {
        if(err) { fail(err) }

        if(res) {
            jsdom.env({
                html: [res.text],
                src: [jquery],
                done: (err, window) => {
                    if(err) fail(err)

                    const jQuery = window.$
                    schoolLinks = getResultsLinks(jQuery)
                    schoolLinks = _.map(schoolLinks, (eachLink) => `${mainLink}${eachLink}`)

                    cb(schoolLinks)
                }
            })
        } else { 
            fail('network error')
            networkErrorMsg('getSchoolsLink', mainLink) 
        }
    })
}

function getResults(schoolLink, cb, fail) {
    console.log(`Processing ${schoolLink}`)

    request.get(schoolLink).end((err, res) => {
        if(err) { fail(err) }

        if(res && res.text != null) {
            jsdom.env({
                html: [res.text],
                src: [jquery],
                done: (err, window) => {
                    if(err) fail(err)

                    const jQuery = window.$
                    const results = firstTable(jQuery)

                    cb(results)
                }
            })
        } else { 
            fail('network error')
            networkErrorMsg('getResults', schoolLink) 
        }
    })
}

function promisify(func, value) {
    return new Promise((resolve, reject) => func(value, resolve, reject))
}

function getResultsPromises(arrayLinks, cb, fail) {
    try{
        const results = _.map(arrayLinks, link => promisify(getResults, link))
        cb(results)
    }catch(err) {
        console.log('Something went wrong while getting results')
        fail(err)
    }
}

let count = 0
function networkErrorMsg(func, links) {
    if(func === 'getSchoolsLink' && count < 4) {
        mainLinksNetworkError(links)
    } else if(func === 'getResults' && count === 0) {
        count++
        getResultsNetworkErorr(links)
    }

    if(count === 4) {
       console.log('Network is really terrible!\nChill\n')
       process.exit()
    }
}

function mainLinksNetworkError(links) {
    console.log(
    `\nNetwork Error
    \nRetry in 10 seconds!`)

    count++
    let composedRunner = _.partial(runner, links)
    let debounced = _.debounce(composedRunner, 10000)
    debounced()
}

const isUpper = (str) => str == _.toUpper(str) && str != _.toLower(str)

function compareLinks({dbSchools, urlLinks}, cb, fail) {
    try {
        const schoolsReturned = _.map(urlLinks, (link) => extractFromUrl(link, 'retry'))

        if(isUpper(schoolsReturned[0])) {
            const unSavedSchools = _.difference(schoolsReturned, dbSchools)
            const schoolsUrls = _.map(unSavedSchools, (school) => _.replace(urlLinks[0], /[PS]{1}[0-9]{4}/, school))
            cb(schoolsUrls)
        } else {
            const schoolsUpper = _.map(schoolsReturned, _.upperFirst) //- convert url strings to uppercase to match that of db.
            const unSavedSchools = _.difference(schoolsUpper, dbSchools)
            const schoolsLower = _.map(unSavedSchools, school => school.toLowerCase()) //- Urls are in lowerCase
            const schoolsUrls = _.map(schoolsLower, school => _.replace(urlLinks[0], /[ps]{1}[0-9]{4}/, school))
            cb(schoolsUrls)
        }

    }catch(err) {
        console.log('Something Happened while recovering!')
        fail(err)
    }
}

function processPartialResults(linksArray) {
    return promisify(compareLinks, linksArray)
        .then(rollerCoaster)
}

async function getResultsNetworkErorr(link) {
    let mainLink = link.slice(0, 51)
    console.log(`Network Error while parsing:\n${mainLink}`)

    const links = await getLinks(mainLink)
    
    processPartialResults(links)
        .then(rollerCoaster)
}

const isHtm = (str) => str && str.slice(-4).indexOf('.') >= 0

function extractFromUrl(link, type) {
    if(type === 'main') {
        const typeYear = link.slice(42).slice(0, -1)
        let examType = ''
        let year = ''

        //- Handling CSEE2012-2 typed exams!
        if(typeYear.indexOf('-') > 0) {
            examType = typeYear.slice(0, -6)
            year = typeYear.slice(examType.length).slice(0, -2)
        } else {
            examType = typeYear.slice(0, -4)
            year = typeYear.slice(examType.length)
        }

        return {examType, year}
    } else if(type === 'retry') {
        if(isHtm(link)) {
            return link.slice(0, -4).slice(-5)
        } else {
            return link.slice(0, -5).slice(-5)
        }
    }
}

async function checkResultsExistance(mainLink) {
    const obj = extractFromUrl(mainLink, 'main')
    const examType = obj.examType
    const examYear = obj.year

    return await getSchools({examYear, examType})
}

export default async function runner(mainLink) {
    const links = await getLinks(mainLink)
    const dbSchools = links.dbSchools
    const urlLinks = links.urlLinks

    if(_.isEmpty(dbSchools)) {
        await rollerCoaster(urlLinks)
    } else {
        //- Process partials
        console.log('No overwriting!')
        processPartialResults(links)
    }
}

function rollerCoaster(links) {
    promisify(getResultsPromises, links)
        .then(results => {
            return _.reduce(results, (promiseChain, currPromise) => {
                return promiseChain.then(() => currPromise).then(saveResults)
            }, Promise.resolve())
        }).then(() => console.log('Complete!'))
        .catch(err => err)
}

async function getLinks(mainLink) {
    const dbSchools = await checkResultsExistance(mainLink)
    const urlLinks = await promisify(getSchoolsLink, mainLink)

    return {dbSchools, urlLinks}
}
