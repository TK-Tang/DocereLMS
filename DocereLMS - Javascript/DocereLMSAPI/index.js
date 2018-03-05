const Express = require("express");
const BodyParser = require("body-parser");
const BCrypt = require("bcrypt-nodejs");
const Passport = require("passport");
const Session = require("express-session")

const App = express();

const Models = require("./models");
const AuthenticationService = require("./middleware/authentication-service.js");

app.use(session({ secret: "secret_seed", 
    resave: true,
    saveUninitialized: false,
    secure: false,
    rolling: true }));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(AuthenticationService.isStudent);

const AuthenticationRoute = require("./routes/authentication-router.js")(app, passport);


