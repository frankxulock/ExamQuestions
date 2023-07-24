require('dotenv-flow').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')
const logger = require('morgan');
const expressSwaggerWrapper = require("express-swagger-generator");

const exampleRouter = require('./app/controllers/example');
const usersRouter = require('./app/routes/users');
const packageJson = require('./package.json');

const { PORT } = process.env;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Configure express-session middleware
app.use(
    session({
      secret: 'demoCali',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false } // Set to 'true' for HTTPS only
    })
);
  

app.use('/', usersRouter);
app.use('/example', exampleRouter);

const expressSwagger = expressSwaggerWrapper(app);
const options = {
  swaggerDefinition: {
    info: {
      title: "Backend Exam API Service",
      description: "Backend Exam API Service",
      version: packageJson.version,
    },
    host: `localhost:${PORT}`,
    basePath: "/",
    produces: ["application/json"],
    schemes: ["http", "https"],
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "",
      },
    },
  },
  basedir: __dirname, //app absolute path
  files: ["./app/routes/*.js", "./app/controllers/**/*.js"], //Path to the API handle folder
};
expressSwagger(options);

module.exports = app;
