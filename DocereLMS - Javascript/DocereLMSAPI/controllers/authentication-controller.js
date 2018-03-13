const Responses = require("../helpers/response");
const Models = require("../models");

exports.signUp = function(req, res){
    Models.Invitations.getByLink(req.params.link).then(function(invitation){
        if(!invitation){
            return res.status(400).send(Responses.fail("Invalid invite link"));
        } else {
            return res.status(200).send(Responses.success("Sign-up"));
        }
    });
}

exports.signIn = function(req, res){
    return res.status(200).send(Responses.success("Sign-in"));
}

exports.signOut = function(req, res){
    req.session.destroy(function(){
        return res.status(200).send(Responses.success("Sign-out"));
    });
}