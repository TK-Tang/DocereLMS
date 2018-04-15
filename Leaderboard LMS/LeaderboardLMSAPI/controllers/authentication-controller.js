const Responses = require("../helpers/response");
const Models = require("../models");

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

exports.signIn = function(req, res){
    Responses.success(res, "Sign-in");
}

exports.signedIn = function(req, res){
    Responses.success(res, "Successfully signed in OOF");
}

exports.signOut = function(req, res){
    req.session.destroy(function(){
        Responses.success(res, "Sign-out");
    });
}