require('dotenv').config()
import koa from 'koa'
import crawler from './crawler'
import mongoose from 'mongoose'
import es6Promise from 'es6-promise'
import rollIt from './db-pg'

// mongoose.Promise = es6Promise.Promise
// try {
//     mongoose.connect('mongodb://localhost/necta-2017')
// }catch(err) {
//     mongoose.createConnection('mongodb://localhost/necta-2017')
// }

const app = new koa()
// const mainLink = 'http://maktaba.tetea.org/exam-results/ACSEE2017/index.htm'

// crawler(mainLink)

rollIt()

export default app
