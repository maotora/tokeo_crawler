import axios from 'axios'
import { 
    recoverPasswordUrlOffline,
    recoverPasswordUrl,
    baseUrl,
    baseUrlOffline,
    syncUrl,
    syncUrlOffline,
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
    checkConnetion()
        .then(() => {
            return axios.post(recoverPasswordUrl, user)
        })
        .catch(() => {
            return axios.post(recoverPasswordUrlOffline, user)
        })
}
