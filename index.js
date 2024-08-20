//Open server
const express = require("express")
const app = require("./server_files/app.js")
app.listen(9090,() => {
    console.log("Server is listening on port 9090")
})

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
const seedDatabase = require("./server_files/database/seed_database.js")
seedDatabase(pool)