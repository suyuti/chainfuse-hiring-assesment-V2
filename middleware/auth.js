const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.auth = function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ error: 'No token found' });
    }

    try {
        const jwtSecret = process.env.jwtSecret || '';
        jwt.verify(token, jwtSecret, (error, decoded) => {
            if (error) {
                return res.status(401).json({ error: 'Token not valid' });
            }
            else {
                req.user = decoded.user;
                next();
            }
        });
    }
    catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};