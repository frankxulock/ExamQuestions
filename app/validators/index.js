const { validationResult } = require("express-validator");

module.exports.validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  console.log(errors)
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))
  
  return res.status(422).json({
    errors: extractedErrors,
  })
}