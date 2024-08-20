const db = require("./database/db_index.js")
const format = require("pg-format")

//endpoint "/"
exports.selectGenericMsg = () => {
    return {msg: "Welcome to the server!"}
}

//Get user by parametric
exports.selectUserByParametric = (user) => {
    const SQLString = format("SELECT * FROM my_table WHERE name = %L", user)
    return db.query(SQLString)
}

//Get usernames by isOnline?
exports.selectUserNamesByIsOnlineQuery = (queryBool) => {
    const SQLString = format("SELECT name FROM my_table WHERE isOnline = %L", queryBool)
    return db.query(SQLString)
}