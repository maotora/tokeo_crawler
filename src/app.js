require('dotenv').config()
import koa from 'koa'
import crawler from './crawler'
import mongoose from 'mongoose'
import es6Promise from 'es6-promise'
import body from 'koa-better-body'
import convert from 'koa-convert'
import resultsRoutes from './routes'
// import rollIt from './db-pg'

//- Own files
// import standardize from './stds'

mongoose.Promise = es6Promise.Promise
try {
    mongoose.connect('mongodb://localhost/necta-2017')
}catch(err) {
    mongoose.createConnection('mongodb://localhost/necta-2017')
}

const app = new koa()
const mainLink = 'http://maktaba.tetea.org/exam-results/ACSEE2017/index.htm'

crawler(mainLink)

//standardize()

// rollIt()

app.use(resultsRoutes.middleware())
app.use(convert(body({
    fields: 'body',
})))
export default app
