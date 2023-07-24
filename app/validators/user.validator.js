const { body } = require("express-validator");
const validate = require("./index.js").validate;
const User = require("../db/models").User;

module.exports.createValidationRules = () => {
  return [
    body("email")
      .notEmpty().withMessage("email is empty")
      .isEmail().withMessage("must be at an email")
      .custom(value => { 
        if(value) {
          return User.findOne({ where: { email: value }, paranoid: false }).then(user => {
            if (user) {
              return Promise.reject("E-mail already in use")
            }
          })
        } else {
          return Promise.reject("invalid value")
        }
      }),
    body("name")
      .notEmpty().withMessage("name is empty")
      .isLength({ min: 3, max: 20 }).withMessage("must be at least 3-20 chars long"),
    body("password")
      .notEmpty().withMessage("password is empty")
      .isLength({ min: 6, max: 16 }).withMessage("must be at least 6-16 chars long")
      .custom(value => {
        if(!/.*[a-z].*/.test(value)) return Promise.reject("at least one lowercase word")
        if(!/\d/.test(value)) return Promise.reject("at least one number")
        return Promise.resolve()
      }),
  ]
}

module.exports.validate = validate