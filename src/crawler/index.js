import fs from 'fs'
import request from 'superagent'
import jsdom from 'jsdom'
import _ from 'lodash'
import firstTable from './../lib/first-table'
import { getResultsLinks } from './../lib/misc'
import saveResults from './../db/'

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

        if(res) {
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

function getResultsPromises(arrayLinks) {
    return _.map(arrayLinks, link => promisify(getResults, link))
}

export default function runner(mainLink) {
    rollerCoaster(getSchoolsLink, mainLink)
}

function rollerCoaster(func, mainLink) {
    try{
        promisify(func, mainLink)
            .then(getResultsPromises)
            .then(results => {
                return _.reduce(results, (promiseChain, currPromise) => {
                    return promiseChain.then(() => currPromise).then(saveResults)
                }, Promise.resolve())
            })
            .catch(err => err)
    }catch(err) {
        console.log('some')
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

function getResultsNetworkErorr(link) {
    console.log(
        `Network Error while parsing`
    )

    let mainLink = link.slice(0, 51)

    console.log(mainLink)
    
    //- find all distinct docs from db with schoolNumber as links.

    // process.nextTick(() => process.exit())
}
