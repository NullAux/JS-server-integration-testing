const express = require("express")
const models = require("./models")

//endpoint "/"
exports.getGenericMsg = (req,res) => {
    const result = models.selectGenericMsg()
    res.status(200).send(result)
}