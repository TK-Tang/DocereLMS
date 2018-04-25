const Responses = require("../helpers/response");
const Models = require("../models");

exports.getCurrentUser = function(req, res){
    if (req.user.email){
        Responses.success(res, "Current user", { "email": req.user.email, "username": req.user.username });
    } else {
        Responses.fail(res, "You are not logged in", null);
    }
    
}

exports.signUp = function(req, res){
    Models.Invitations.getByLink(req.params.link).then(function(invitation){
        if(!invitation){
            Responses.fail(res, "Invalid invite link");
        } else {
            Responses.success(res, "Sign-up");
        }
    });
}

exports.signedUp =  function(req, res){
    Responses.success(res, "Successfully signed up", null);
}

exports.signedIn = function(req, res){
    Responses.success(res, "Successfully signed in", null);
}

exports.signOut = function(req, res){
    req.logout();
    req.session.destroy(function(){
        res.clearCookie('connect.sid');
        Responses.success(res, "Sign-out", null);
    });
}