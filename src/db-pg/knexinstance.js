import knexconf from '../../knexfile'
import knex from 'knex'

export default knex(knexconf.production)
