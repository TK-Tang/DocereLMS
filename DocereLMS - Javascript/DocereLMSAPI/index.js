const Express = require("express");
const BodyParser = require("body-parser");
const BCrypt = require("bcrypt-nodejs");
const Passport = require("passport");
const Session = require("require-session")

const App = express();

const Models = require("./models");
const AuthenticationService = require("./middleware/AuthenticationService.js")