// Update with your config settings.

module.exports = {

  production: {
    client: 'postgresql',
    connection: {
      database: 'statistics-test',
      user:     'postgres',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
