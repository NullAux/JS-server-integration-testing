//node-postgres
const {Pool} = require("pg")
const pool = new Pool({
    database: 'js_server_integration_testing_db'//Created in terminal prior
})

exports.query = (text, params, callback) => {
    return pool.query(text, params, callback)
}

exports.getClient = () => {
    return pool.connect()
}

//Seed database
const seedDatabase = require("./seed_database")
seedDatabase(pool)