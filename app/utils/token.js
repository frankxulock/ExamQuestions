
const { expressjwt } = require('express-jwt');
const jwt = require('jsonwebtoken');
const User = require("../db/models").User;

const SECRET = 'DEMOCali'
const token = {
    SECRET,
    sign: (user) => {
        return jwt.sign(user, SECRET, { expiresIn: '12h' })
    },
    getToken: (req) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    },
    validToken: expressjwt({
        secret: SECRET,
        getToken: (req) => {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            } else if (req.query && req.query.token) {
                return req.query.token;
            }
            return null;
        },
        algorithms: ["HS256"]
    }),
    checkToken: async (req, res, next) => {
        const tok = token.getToken(req);
        const auth = req.auth;
        if(auth) {
            const email = auth.email;
            const checkEmailRes = await User.findOne({ where: { email }, paranoid: false });
            if(!checkEmailRes) res.status(401).json({ message: "token error user not exist" });
        } else if(!tok){
            res.send({message: "Authentication is invalid or not logged in, please log in again"});
        } else{
            next();
        }
    }
}
module.exports = token
