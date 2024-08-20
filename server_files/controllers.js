const models = require("./models")

//endpoint "/"
exports.getGenericMsg = (req,res) => {
    const result = models.selectGenericMsg()
    res.status(200).send(result)
}

//Get user by parametric endpoint
exports.getUserByParametric = (req, res) => {
    const user = req.params.user
    models.selectUserByParametric(user)
    .then((result) => {
        res.status(200).send(result.rows[0])
    })
}

//Get user names by isOnline?
exports.getUserNamesByIsOnlineQuery = (req,res) => {
    const {query} = req
    models.selectUserNamesByIsOnlineQuery(query.isOnline)
    .then((result) => {
        result.rows = result.rows.map((nameObj) => nameObj.name)
        res.status(200).send(result.rows)
    })
}