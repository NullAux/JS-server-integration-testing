const db = require("./database/db_index.js")
const format = require("pg-format")

//endpoint "/"
exports.selectGenericMsg = () => {
    return {msg: "Welcome to the server!"}
}

//Get user by parametric
exports.selectUserByParametric = (user) => {
    //Check the name is valid length
    if (user.length > 20) {
        return Promise.reject({
            status:400,
            msg:`User name ${user} is invalid (too long)`
        })
    }
    const SQLString = format("SELECT * FROM my_table WHERE name = %L", user)
    return db.query(SQLString)
    .then((result) => {
        //Check query response isn't empty
        if (result.rowCount === 0){
            return Promise.reject({
                status:404,
                msg:`User name ${user} was not found in database`
            })
        }
        return result
    })
}

//Get usernames by isOnline?
exports.selectUserNamesByIsOnlineQuery = (queryBool) => {
    const SQLString = format("SELECT name FROM my_table WHERE isOnline = %L", queryBool)
    return db.query(SQLString)
}