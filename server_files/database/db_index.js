//dotenv / get correct db env
const ENV = process.env.NODE_ENV || 'development'
require("dotenv").config({
    path: `${__dirname}/../../env/.env.${ENV}`
})
if (!process.env.PGDATABASE)
{
    throw new Error("process.env.PGDATABASE has not been set. Check that you entered a valid NODE_ENV and that .env files are set up correctly.")
}
console.log("Connected to database ", process.env.PGDATABASE, " using NODE_ENV ", ENV)

//node-postgres
const {Pool} = require("pg")
const pool = new Pool()

//Databases:
//js_server_integration_testing_db - the user version
//js_server_integration_testing_development_db - the developer version which should be seeded / used for tests

exports.query = (text, params, callback) => {
    return pool.query(text, params, callback)
}

exports.getClient = () => {
    return pool.connect()
}

exports.closePool = async () => {
    return await pool.end()
}