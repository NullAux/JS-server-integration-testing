const utils = require("./utils.js")
const format = require("pg-format")

const databaseData = [
    ["userNumberOne", 'FALSE', "I'm number one!"],
    ["SecondUser", "TRUE", "Rising star!"],
    ["<3('rd user)", "TRUE", "..."],
    ["4th Gear", "FALSE", "Named after a particularly good song."]
]

async function seedDatabase(pool) {
    await utils.dropTable(pool)
    await utils.createTable(pool)

    await(pool.query(format('INSERT INTO my_table (name, isOnline, status) VALUES %L', databaseData)))

    const table = await(pool.query('SELECT * FROM my_table'))
    //console.log(table.rows)
}

//seedDatabase()
module.exports = seedDatabase