const bcrypt = require("bcrypt");
const { Op } = require("sequelize")
const User = require("../db/models").User;
const token = require("../utils/token");

exports.create = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.send({data: { id: newUser.id, email: newUser.email, name: newUser.name }});
    } catch(err) {
        res.status(400).send({
            message: err.message || "null"
        })
    }
}

exports.login = async (req, res) => {
    try {
        const userInfo = req.body;
        const user = await User.findOne({ where: { email: userInfo.email } });
        const match = await bcrypt.compare(userInfo.password, user.password);
        if(!match) res.status(400).send({ message: "password is wrong" });
        if(!user) res.status(400).send({ message: "user not exist" });
        res.send({data: { id: user.id, email: user.email, name: user.name }});
    } catch(err) {
        res.status(400).send({
            message: err.message || "null"
        })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const pageSize = parseInt(req.query.pageSize);
        const params = {
            attributes: ["id", "email", "name"],
            page: parseInt(req.query.page) || 1,
            pageSize: pageSize ? pageSize > 50 ? 50 : pageSize : 20,
        };
        const name = req.query.name || null
        if(name) {
            params.where = { name: { [Op.like]: "%"+ name +"%" } }
        };
        const {docs, pages, total} = await User.paginate(params);
        res.send({meta: {total: total, pages: pages }, data: docs})
    } catch(err) {
        res.status(400).send({
            message: err.message || "No data"
        })
    }   
}

exports.getUser = async (req, res) => {
    try {
      const paramId = req.params.id
      const getUser = await User.findOne({ where: { id: paramId }, attributes: ["id", "created_at", "email", "name"] })
      res.send({data: getUser})
    } catch(err) {
      res.status(400).send({
        message: err.message || "null"
      })
    }
  }