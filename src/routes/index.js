import Router from 'koa-rest-router'
import { getStudents } from './../db'
import _ from 'lodash'
import qs from 'qs'

const api = new Router({prefix: '/api/v1'})

//- Get single student. S0172/0001/2008
//- Get students with same id S0172/0001

//- Get all students in school all years S0172
//- Get all students in school certain year S0172/2009

async function fetch(params, options={limitVal: 4}) {
    try{
        const students = await getStudents(params, options)
        return students

    } catch(err) {
        console.log(err.stack)
    }
}

function getParams(urlStr) {
    const queryIndex = _.add(_.indexOf(urlStr, '?'), 1)
    const queryArray = _.slice(urlStr, queryIndex)
    const queryString = _.join(queryArray, '')

    return qs.parse(queryString)
}

api.resource('results', {
    index: async (ctx, next) => {
        const body = await ctx

        const {params, options} = getParams(body.request.url)

        const msg = await fetch(params, options)
        ctx.body = msg
        await next
    },
    show: async (ctx, next) => {
        const msg = 'showing a single result'
        console.log(msg)
        ctx.body = msg
        await next
    },
    edit: async (ctx, next) => {
        const msg = 'getting a single result for edit'
        console.log(msg)
        ctx.body = msg
        await next
    },
    update: async(ctx, next) => {
        const msg = 'updating a single result'
        console.log(msg)
        ctx.body = msg
        await next
    },
    remove: async(ctx, next) => {
        const msg = 'removing a single result'
        console.log(msg)
        ctx.body = msg
        await next
    }
})

export default api
