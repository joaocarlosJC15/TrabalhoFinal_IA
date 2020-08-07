const knex = require('knex');

import { databaseSQLInfo } from '../../../../main/config/env'

const connection = knex({
  client: 'pg',
  connection: {
    host: databaseSQLInfo.host,
    user: databaseSQLInfo.user,
    password: databaseSQLInfo.password,
    database: databaseSQLInfo.database
  }
});

export { connection };