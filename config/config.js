
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PWD,
    database: process.env.DB_TESTDB,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  production: {
    username: process.env.PROD_USERNAME,
    password: process.env.PROD_PWD,
    database: process.env.PROD_DATABASE,
    host: process.env.PROD_HOST,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,  
      },
    },
  },
}
