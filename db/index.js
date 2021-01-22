const Pool = require('pg').Pool
const dbConfig = require("../db/config/db.config.js");

const pool = new Pool({
    host: dbConfig.HOST,
    database: dbConfig.DB,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    port: dbConfig.PORT
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },
}