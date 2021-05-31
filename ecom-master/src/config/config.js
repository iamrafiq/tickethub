const fs = require('fs');


module.exports = {
  development: {
    username: process.env.DB_USENAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: process.env.DB_USENAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: process.env.DB_USENAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {
        ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
      }
    }
  }
};