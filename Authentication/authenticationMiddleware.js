const authentication = require('./auth');

verifyJWT_MW: (req, res, next) => {
    let token = (req.method === 'POST') ? req.body.token : req.query.token
    authentication.verifyToken(token)
        .then((decodedToken) => {
            req.user = decodedToken.data
            next()
        })
        .catch((err) => {
            res.status(400)
                .json({ message: "Invalid auth token provided." })
        })
}

module.exports = verifyTokenMiddleware;