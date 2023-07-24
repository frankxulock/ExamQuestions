
const express_jwt = require('express-jwt')
const jwt = require('jsonwebtoken')

const SECRET = 'DEMO111'
const token = {
    SECRET,
    sign: (user) => {
        return jwt.sign(user, SECRET)
    },
    getToken: (req) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    },
    validToken: express_jwt({
        secret: SECRET,
        getToken: (req) => {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                    return req.headers.authorization.split(' ')[1];
            } else if (req.query && req.query.token) {
                    return req.query.token;
            }
            return null;
    }
    }),
    noAuthorization: (err, req, res, next) => {
        if (err.status == 401) {
            res.json(err)
            return
        }
        next()
    },
    checkSession: (req, res, next) => {
        const tok = token.getToken(req)
        if(!tok){
            res.send({message: "认证失效或没登录，请重新登录"})
        } else{
            next();
        }
    },
    remove: (req) => {
        req.session.destroy(err => {
            if (err) {
              console.error('Error destroying session:', err);
              return res.status(500).send('Error clearing session.');
            }
            res.send('Session cleared successfully.');
        });
    }
}
module.exports = token
