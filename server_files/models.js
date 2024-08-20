const express = require("express")

//endpoint "/"
exports.selectGenericMsg = () => {
    return {msg: "Welcome to the server!"}
}