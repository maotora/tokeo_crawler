import axios from 'axios'
import { userLog } from '../sagas/lib'
import request from 'superagent'
import { 
    recoverPasswordUrlOffline,
    recoverPasswordUrl,
    baseUrl,
    baseUrlOffline,
    syncUrl,
    syncUrlOffline,
    emailUrl,
    emailUrlOffline,
    validateUrl,
    validateUrlOffline,
    downloadUrl,
    downloadUrlOffline,
} from './urls'


const checkConnetion = () => axios.get(baseUrl)

function createPosts(posts, url) {
    return posts.map(dataObj => axios.post(url, dataObj))
}

export function syncData(data) {
    let axiosArray = []

    checkConnetion()
        .then(() => {
            axiosArray = createPosts(data, syncUrl)
        })
        .catch(() => {
            // axiosArray = createPosts(data, syncUrlOffline)
            userLog('Cannot connect to server, check your internet settings or call us!', 'Connection Errors', 'error')
        })

    return axios.all(axiosArray)
}

export function recover(user) {
    return checkConnetion()
        .then(() => {
            return axios.post(recoverPasswordUrl, user)
        })
        .catch(() => {
            // return axios.post(recoverPasswordUrlOffline, user)
            userLog('Cannot connect to server, check your internet settings or call us!', 'Connection Errors', 'error')
        })
}

//- Yeah using superagent for now cause, it works!
export function sendEmail(contractUrl, {email, names}) {
    return checkConnetion()
        .then(() => {
            return request.post(emailUrl)
                .attach('contract', contractUrl)
                .field('email', email)
                .field('name', names)
        })
        .catch(() => {
            // return request.post(emailUrlOffline)
            //     .attach('contract', contractUrl)
            //     .field('email', email)
            //     .field('name', names)
            userLog('Cannot connect to server, check your internet settings or call us!', 'Connection Errors', 'error')
        })
}

// export function sendEmail({data, headers}) {
//     return checkConnetion()
//         .then(() => {
//             return axios.post(emailUrl, data, {headers})
//         })
//         .catch(() => {
//             return axios.post(emailUrlOffline, data, {headers})
//         })
// }

export function validateLicence({email, macAddress}) {
    return checkConnetion()
        .then(() => {
            return axios.post(validateUrl, {email, macAddress})
        })
        .catch(() => {
            // return axios.post(validateUrlOffline, {email, macAddress})
            userLog('Cannot connect to server, check your internet settings or call us!', 'Connection Errors', 'error')
        })
}

export function download(id) {
    return checkConnetion()
        .then(() => axios.get(`${downloadUrl}/${id}`))
        .catch(() => {
            // return axios.get(`${downloadUrlOffline}/${id}`)
            userLog('Cannot connect to server, check your internet settings or call us!', 'Connection Errors', 'error')
        })
}
