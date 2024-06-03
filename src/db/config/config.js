require('dotenv').config();

const configBase = {
  username: process.env.db_username,
  password: process.env.db_password,
  database: process.env.db_nombre_bdd,
  host: process.env.db_host,
  port: process.env.db_puerto,
  dialect: process.env.db_motor,
  storage: process.env.db_motor === 'sqlite' ? process.env.db_store : undefined
};

module.exports = {
  development: { ...configBase },
  test: {
    ...configBase,
    database: `${process.env.db_nombre_bdd}_test`,
  },
  production: { ...configBase },
};