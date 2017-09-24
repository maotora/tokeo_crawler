import { select, put, call, take } from 'redux-saga/effects'
import axios from 'axios'
import { logger } from './lib'


export default function *synchronize() {
    try {
        const customers = yield select(state => state.customers)
        const properties = yield select(state => state.properties)
        const logs = yield select(state => state.logs)
        const users = yield select(state => state.users)

        axios.post('http://localhost:1337/content', {type: 'customer', data: customers})
            .then(function(res) {
                return res
            })
            .then(function(json) {
                console.log(json)
            })
            .catch(function(err) {
                alert(err)
            })

        axios.post('http://localhost:1337/content', {type: 'user', data: users})
            .then(function(res) {
                return res
            })
            .then(function(json) {
                console.log(json)
            })
            .catch(function(err) {
                alert(err)
            })

        axios.post('http://localhost:1337/content', {type: 'logs', data: logs})
            .then(function(res) {
                return res
            })
            .then(function(json) {
                console.log(json)
            })
            .catch(function(err) {
                alert(err)
            })

        axios.post('http://localhost:1337/content', {type: 'property', data: properties})
            .then(function(res) {
                return res
            })
            .then(function(json) {
                console.log(json)
            })
            .catch(function(err) {
                alert(err)
            })
    }catch(err) {
        alert(err.message)
    }
}
