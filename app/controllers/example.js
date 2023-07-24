const express = require('express');
const router = express.Router();

/**
 * @typedef ExampleResponse
 * @property {string} message.required
 *  - example message
 *  - eg: hello world
 */

/**
 * get Application Version information object
 * @route GET /example
 * @group Example - API 範例
 * @returns {ExampleResponse.model} 200 - Version Response Object
 */
router.get('/', function(req, res, next) {
  res.status(200).json({ message: "hello world" });
});

module.exports = router;
