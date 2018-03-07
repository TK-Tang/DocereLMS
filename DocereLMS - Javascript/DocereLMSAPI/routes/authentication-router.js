const AuthenticationController = require("../controllers/authentication-controller.js");
const AuthenticationService = require("../middleware/authentication-service");
const Responses = require("../helpers/response");

module.exports = function(app, passport){
    app.get("/auth/signup", AuthenticationService.isNotAuthenticated, AuthenticationController.signUp);
    app.post("/auth/signup", AuthenticationService.isNotAuthenticated, passport.authenticate("local-signup"), (req, res) => {
        res.status(200).send(Responses.success("success"));
    });

    app.get("/auth/signin", AuthenticationService.isNotAuthenticated, AuthenticationController.signIn);
    app.post("/auth/signin", AuthenticationService.isNotAuthenticated, passport.authenticate("local-signin"), (req, res) => {
        res.status(200).send(Responses.success("success"));
    })

    app.get("/auth/signout", AuthenticationService.isAuthenticated, AuthenticationController.signOut);
}