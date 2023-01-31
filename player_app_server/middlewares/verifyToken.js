const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header('Authorization');

    if(!token) return res.status(401).send('Access denied');

    try {
        // verified user
        const decodedUser = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decodedUser;

        next();
    }
    catch (e) {
        res.status(400).send('Invalid Token');
    }
}