const AuthenticationController = require("../controllers/authentication-controller.js");
const AuthenticationService = require("../middleware/authentication-service");
const Responses = require("../helpers/response");

module.exports = function(app, passport){
    app.get("/auth/user", AuthenticationService.isLoggedIn, AuthenticationController.getCurrentUser);

    app.get("/auth/signup/:link", AuthenticationController.signUp);
    app.put("/auth/signup/:link", passport.authenticate("local-signup"), AuthenticationController.signedUp);

    app.post("/auth/signin", AuthenticationService.isNotLoggedIn, passport.authenticate("local-signin",  { failWithError: true }), function(err, req, res, next) {
        console.log("Sign up error");
        Responses.fail(res, "Sign up error", null);
    }, AuthenticationController.signedIn);

    app.get("/auth/signout", AuthenticationService.isLoggedIn, AuthenticationController.signOut);
}