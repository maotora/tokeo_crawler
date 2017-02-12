require('dotenv').config()
import koa from 'koa'
import crawler from './crawler'
import mongoose from 'mongoose'
import es6Promise from 'es6-promise'

mongoose.Promise = es6Promise.Promise
try {
    mongoose.connect('mongodb://localhost/necta')
}catch(err) {
    mongoose.createConnection('mongodb://localhost/necta')
}

const app = new koa()
const mainLink = 'http://www.maktaba.tetea.org/exam-results/CSEE2016/'

crawler(mainLink)

export default app
