const express = require("express");
const router = express.Router();
const token = require('../utils/token');

const user = require("../controllers/user.controller.js");
const userValidator = require("../validators/user.validator.js");

/**
 * @typedef User
 * @property {string} email.required - test@example.com - Email user
 * @property {string} name.required - testuser - Name user
 * @property {string} password.required - password123 - Password user
 */

/**
 * @typedef SignInDTO
 * @property {string} email.required - test@example.com - Email user
 * @property {string} password.required - password123 - Password user
 */

// POST signup users
/**
 * @route POST /users
 * @group User - Operations about user
 * @param {User.model} data.body - Email & Password - eg: user@domain
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post("/users", userValidator.createValidationRules(), userValidator.validate, user.create)

// POST signin user
/**
 * @route POST /login
 * @group User - Operations about user
 * @param {SignInDTO.model} data.body - Email & Password - eg: user@domain
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post("/login", userValidator.createValidationRules(false), userValidator.validate, user.login)

// GET users list
/**
 * @route GET /users
 * @group User - Operations about users
 * @param {string} name.query - Name
 * @param {integer} page.query - Page - 1
 * @param {integer} pageSize.query - PageSize - 10
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.get("/users", token.checkTokenEmpty, token.validToken, token.checkToken, user.getUsers)

// GET user detail data
/**
 * @route GET /users/{id}
 * @group User - Operations about user
 * @param {string} id.path.required - User ID - User ID 
 * @param {User.model} data.body test - Some Name description - Data body
 * @returns {object} 200 - user info
 * @returns {Error}  default - Unexpected error
 */
router.get("/:id", user.getUser)

module.exports = router
