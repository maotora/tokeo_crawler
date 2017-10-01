import axios from 'axios'
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
            axiosArray = createPosts(data, syncUrlOffline)
        })

    return axios.all(axiosArray)
}

export function recover(user) {
    return checkConnetion()
        .then(() => {
            return axios.post(recoverPasswordUrl, user)
        })
        .catch(() => {
            return axios.post(recoverPasswordUrlOffline, user)
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
            return request.post(emailUrlOffline)
                .attach('contract', contractUrl)
                .field('email', email)
                .field('name', names)
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
            return axios.post(validateUrlOffline, {email, macAddress})
        })
}
