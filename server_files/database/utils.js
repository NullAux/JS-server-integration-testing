//Drop table
async function dropTable (pool) {
    return pool.query('DROP TABLE IF EXISTS my_table')
}

//Create table
async function createTable(pool) {
    return pool.query('CREATE TABLE my_table (id SERIAL PRIMARY KEY, name VARCHAR(20), isOnline BOOLEAN, status VARCHAR(100))')
}

module.exports = {dropTable, createTable}