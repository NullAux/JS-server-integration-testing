const express = require("express")
const app = express()
const controllers = require("./controllers.js")
module.exports = app

//app.use(express.json())//<- use this to take requests for the database info

//Add listen to another file

//Endpoints to test:

//Get / - return message (in obj)
app.get("/", (req,res) => {
    controllers.getGenericMsg(req,res)
})

//Parametric endpoint (get a row from a table of endpoint eg users/:user)
app.get("/users/:user", (req, res) => {
    controllers.getUserByParametric(req, res)
})

//Query in endpoint (get users by given table entry to property eg user/query?isOnline=true)
//Can add check / other query responses
app.get("/users", (req,res) => {
    controllers.getUserNamesByIsOnlineQuery(req,res)
})

//POST / PUT / DELETE examples