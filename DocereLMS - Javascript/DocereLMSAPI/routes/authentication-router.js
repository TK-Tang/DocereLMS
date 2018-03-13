const AuthenticationController = require("../controllers/authentication-controller.js");
const AuthenticationService = require("../middleware/authentication-service");
const Responses = require("../helpers/response");

module.exports = function(app, passport){
    app.get("/auth/signup/:link", AuthenticationService.isNotLoggedIn, AuthenticationController.signUp);
    app.post("/auth/signup/:link", AuthenticationService.isNotLoggedIn, passport.authenticate("local-signup"), (req, res) => {
        res.status(200).send(Responses.success("success"));
    });

    app.get("/auth/signin", AuthenticationService.isNotLoggedIn, AuthenticationController.signIn);
    app.post("/auth/signin", AuthenticationService.isNotLoggedIn, passport.authenticate("local-signin"), (req, res) => {
        res.status(200).send(Responses.success("success"));
    })

    app.get("/auth/signout", AuthenticationService.isLoggedIn, AuthenticationController.signOut);
}