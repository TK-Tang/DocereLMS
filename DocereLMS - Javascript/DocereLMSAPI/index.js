const Express = require("express");
const BodyParser = require("body-parser");
const BCrypt = require("bcrypt-nodejs");
const Passport = require("passport");
const Session = require("express-session")

const App = express();

const Models = require("./models");
const AuthenticationService = require("./middleware/authentication-service.js");


app.use(session({ secret: "secret_seed", resave: true, saveUninitialized: false, secure: false, rolling: true }));
app.use(Passport.initialize());
app.use(Passport.session());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(AuthenticationService.isStudent);

const AuthenticationRouter = require("./routes/authentication-router.js")(App, Passport);
require('./passport/passport.js')(Passport, Models.Users);

