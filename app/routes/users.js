var express = require("express");
var router = express.Router();

const user = require("../controllers/user.controller.js");
const userValidator = require("../validators/user.validator.js");

/**
 * @typedef User
 * @property {string} email.required - test@example.com - Email user
 * @property {string} name.required - testuser - Name user
 * @property {string} password.required - password123 - Password user
 */

// POST signup users
/**
 * This function comment is parsed by doctrine
 * @route POST /users
 * @group User - Operations about user
 * @param {User.model} data.body - Email & Password - eg: user@domain
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post("/", userValidator.createValidationRules(), userValidator.validate, user.create)

module.exports = router
