import Router from 'koa-rest-router'

const api = new Router({prefix: '/api/v1'})
const router = api.loadMethods()

//- Get single student. S0172/0001/2008
//- Get students with same id S0172/0001

//- Get all students in school all years S0172
//- Get all students in school certain year S0172/2009

//- Get
