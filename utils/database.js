const db = require('knex')({
 client: 'sqlite3',
  connection: {
    filename: process.env.DATABASE_FILE
  },
  useNullAsDefault: true
});

export default db