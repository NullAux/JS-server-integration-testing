const express = require("express")
const db = require("./database/db_index.js")

//endpoint "/"
exports.selectGenericMsg = () => {
    return {msg: "Welcome to the server!"}
}