const express = require("express")
const app = express()
const controllers = require("./controllers.js")
module.exports = app

//app.use(express.json())//<- use this to take requests for the database info

//First check using .use and next
/*
app.use((req,res,next) => {
    console.log("I am the app.use")
    next()
})
//Check success! remove in next commit
*/

//Endpoints to test:

//Get / - return message (in obj)
app.get("/", (req,res) => {
    controllers.getGenericMsg(req,res)
})

//Parametric endpoint (get a row from a table of endpoint eg users/:user)
app.get("/users/:user", (req, res, next) => {
    controllers.getUserByParametric(req, res, next)
})


//Query in endpoint (get users by given table entry to property eg user/query?isOnline=true)
//Can add check / other query responses
app.get("/users", (req,res,next) => {
    controllers.getUserNamesByIsOnlineQuery(req,res,next)
})

//POST / PUT / DELETE examples

//Error handling
//400 Bad Request
app.use((err, req, res, next) => {
    console.log("App use error handle block ran for", err)
    //Handle custom errors
    if(err.status && err.msg)
    {
        res.status(err.status).send({msg: err.msg})
    }

    //Handle unexpected errors...
})