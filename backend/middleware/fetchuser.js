const jwt = require('jsonwebtoken')
const JSON_SECRET_KEY = "Hell0Peter"
const fetchUser = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send("Nikal")
    }
    try {

        const data = jwt.verify(token, JSON_SECRET_KEY)
        console.log(data)
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send("Nikal")

    }

}
module.exports = fetchUser;