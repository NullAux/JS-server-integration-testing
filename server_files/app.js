const express = require("express")
const app = express()
const controllers = require("./controllers.js")
module.exports = app

//app.use(express.json())//<- use this to take requests for the database info


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

//Get requested columns from database
//Should be in form /users/column1+column2 etc. Ideally would be done by search bar in website which could format input
app.get("/users/multi/:columns", (req, res, next) => {
    controllers.getUsersColumnsByMultiParamRequest(req,res,next)
})

//Get name by approximate search term using LIKE
//Again, should be handled by search bar
app.get("/users/nameLike/:name", (req,res,next) => {
    controllers.getUserNameLike(req,res,next)
})

//POST / PUT / DELETE examples

//Error handling
//Can split into serveral .use's, move into a seperate file after adding more
app.use((err, req, res, next) => {
    console.log("App error handle block ran for", err)
    //Handle custom errors
    if(err.status && err.msg)
    {
        res.status(err.status).send({msg: err.msg})
    }

    //Handle unexpected errors...
    //PotgreSQL - 22P02 invalid_text_representation (Query given wrong data type)
    if (err.code === "22P02")
    {
        res.status(400).send({msg: "Query given wrong data type."})
    }
})