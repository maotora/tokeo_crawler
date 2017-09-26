import axios from 'axios'
import { 
    recoverPasswordUrlOffline,
    recoverPasswordUrl,
    syncUrl,
    syncUrlOffline,
} from './urls'

export function syncData(dataArray) {
    const axiosArray = dataArray.map(dataObj => {
        return axios.post(syncUrlOffline, dataObj)
    })

    return axios.all(axiosArray)
}

export function recover(user) {
    return axios.post(recoverPasswordUrlOffline, user)
}
