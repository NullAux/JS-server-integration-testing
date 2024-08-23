const models = require("./models")
const express = require("express")

//endpoint "/"
exports.getGenericMsg = (req,res) => {
    const result = models.selectGenericMsg()
    res.status(200).send(result)
}

//Get user by parametric endpoint
exports.getUserByParametric = (req, res, next) => {
    const user = req.params.user
    models.selectUserByParametric(user)
    .then((result) => {
        res.status(200).send(result.rows[0])
    })
    .catch(next)
}


//Get user names by isOnline?
exports.getUserNamesByIsOnlineQuery = (req,res,next) => {
    const {query} = req
    models.selectUserNamesByIsOnlineQuery(query.isOnline)
    .then((result) => {
        result.rows = result.rows.map((nameObj) => nameObj.name)
        res.status(200).send(result.rows)
    })
    .catch(next)
}


//Get multiple columns by one request
exports.getUsersColumnsByMultiParamRequest = (req,res,next) => {
    const params = req.params.columns.split("+")
    models.selectUsersColumnsByMultiParamRequest(params)
    .then((result) => {
        res.status(200).send(result.rows)
    })
    .catch(next)
}


//Get username by approximate search term
exports.getUserNameLike = (req,res,next) => {
    const searchTerm = req.params.name
    models.selectUsernameLike(searchTerm)
    .then((result) => {
        result = result.rows.map((nameObj) => {return nameObj.name})
        res.status(200).send(result)
    })
    .catch(next)
}