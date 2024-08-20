const express = require("express")
const app = express()
module.exports = app

//app.use(express.json())//<- use this to take requests for the database info

//Add listen to another file

//Endpoints to test:

//Get / - return message (in obj)
app.get("/", (req,res) => {
    res.status(200).send({msg: "Welcome to the server!"})
})

//Parametric endpoint (get a row from a table of endpoint eg users/:user)

//Query in endpoint (get users by given table entry to property eg user/query?isOnline=true)