import knex from './knexinstance'
import { executor } from './../stds/'
import _ from 'lodash'

function updater() {
    knex('results').select('*').whereNull('subjects').limit(1000).map((student) => {

            let updatedStudent = executor(null, student)

            return knex('results').where({id: updatedStudent.id})
                .update({subjects: JSON.stringify(updatedStudent.subjects)}, 'id')

    }).then((ids) => console.log('Chillin...'))
        .catch((err) => console.error(err))
}

export default function rollIt() {
    const timer = setInterval(async() => {
        await updater()
    }, 5000)
}
