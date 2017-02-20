require('dotenv').config()
import koa from 'koa'
import crawler from './crawler'
import mongoose from 'mongoose'
import es6Promise from 'es6-promise'
import body from 'koa-better-body'
import convert from 'koa-convert'

//- Own files
import standardize from './stds'

mongoose.Promise = es6Promise.Promise
try {
    mongoose.connect('mongodb://localhost/necta')
}catch(err) {
    mongoose.createConnection('mongodb://localhost/necta')
}

const app = new koa()
// const mainLink = 'http://www.maktaba.tetea.org/exam-results/CSEE2003/'

// crawler(mainLink)

standardize()

app.use(convert(body({
    fields: 'body',
})))
export default app
