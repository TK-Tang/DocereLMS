const AuthenticationController = require("../controllers/authentication-controller.js");
const AuthenticationService = require("../middleware/authentication-service");
const Responses = require("../helpers/response");

module.exports = function(app, passport){
    app.get("/auth/signup/:link", AuthenticationController.signUp);
    app.put("/auth/signup/:link", passport.authenticate("local-signup"), AuthenticationController.signedUp);

    app.get("/auth/signin", AuthenticationService.isNotLoggedIn, AuthenticationController.signIn);
    app.post("/auth/signin", AuthenticationService.isNotLoggedIn, passport.authenticate("local-signin"), AuthenticationController.signedIn);

    app.get("/auth/signout", AuthenticationService.isLoggedIn, AuthenticationController.signOut);
}