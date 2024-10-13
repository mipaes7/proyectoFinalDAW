require('dotenv').config()
const {Pool} = require('pg');

///LOCAL DOCKER
 const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD 
}); 

module.exports = pool;