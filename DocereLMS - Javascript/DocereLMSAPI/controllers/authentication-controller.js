const Responses = require("../helpers/response");

exports.signUp = function(req, res){
    res.status(200).send(Responses.success("Sign-up"));
}

exports.signIn = function(req, res){
    res.status(200).send(Responses.success("Sign-in"));
}

exports.signOut = function(req, res){
    req.session.destroy(function(){
        res.status(200).send(Responses.success("Sign-out"));
    });
}