const User = require("../db/models").User;

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
