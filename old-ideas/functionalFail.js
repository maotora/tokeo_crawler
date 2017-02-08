import fs from 'fs'
import request from 'superagent'
import jsdom from 'jsdom'
import _ from 'lodash'
import firstTable from './../lib/first-table'
import { getResultsLinks } from './../lib/misc'
import ASQ from 'asynquence'

const jquery = fs.readFileSync(__dirname + '/jquery.js', 'utf-8')

function getSchoolsLink(mainLink, cb) {
    let schoolLinks = []

    request.get(mainLink).end((err, res) => {
        if(err) return err

        jsdom.env({
            html: [res.text],
            src: [jquery],
            done: (err, window) => {
                const jQuery = window.$
                schoolLinks = getResultsLinks(jQuery)

                schoolLinks = _.map(schoolLinks, (eachLink) => `${mainLink}${eachLink}`)

                cb(schoolLinks)
            }
        })
    })
}

function getResults(schoolLink, cb) {
    console.log(`Processing ${schoolLink}`)
    request.get(schoolLink).end((err, res) => {
        if(err) return err

        jsdom.env({
            html: [res.text],
            src: [jquery],
            done: (err, window) => {
                const jQuery = window.$
                const results = firstTable(jQuery)

                cb(results)
            }
        })
    })
}

function promiseOfSchoolsLink(mainLink) {
    return new Promise((resolve, reject) => {
        getSchoolsLink(mainLink, resolve)
    })
}

//- :: (mainLink) -> [] of links
function resolveSchoolsLink(promises) {
    return _.reduce(promises, resolvePromises, Promise.resolve())
}

function promisifySchoolResults(schoolLink) {
    return new Promise((resolve, reject) => {
        getResults(schoolLink, resolve)
    })
}

//- :: (getSchoolsLink) => promisifySchoolResults() Promise
function promisifySchools(listOfSchools) {
    return _.map(listOfSchools, promisifySchoolResults)
}

//- :: (value) -> undefined.
function output(value) {
    console.log(value)
}

//- :: (promiseChain, currentPromise) => resolved values
function resolvePromises(promiseChain, currentPromise) {
    return promiseChain.then(() => currentPromise).then(output)
}

//- :: (schoolPromises) => resolve() of Promise
function resolvedSchoolResults(listOfPromises) {
    return _.reduce(listOfPromises, resolvePromises, Promise.resolve())
}


//- composition of
//- map of getSchoolsLink's output
//- reduced with promisifySchoolResults
export default function(mainLink) {
    const resolvedPromises = _.flowRight(resolvedSchoolResults, promisifySchools)
    const results = _.flowRight(resolvedPromises, resolveSchoolsLink, promiseOfSchoolsLink)

    results(mainLink)

    return results
}
