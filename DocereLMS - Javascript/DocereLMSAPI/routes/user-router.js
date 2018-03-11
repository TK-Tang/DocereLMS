const Responses = require("../helpers/response");
const Models = require("../models");

module.exports = function(app){
    app.get("/user/:term", (req, res) => {
        const term = req.params.term;
        
        if (!isNaN(parseInt(term, 10))){
            Models.Users.getUserById(term, Models).then(function(user){
                if (user){
                    return res.status(200).send(Responses.success(user));
                } else {
                    return res.status(400).send(Responses.fail("No use found by that id"));
                }
            });
        } else if (term.indexOf("@") > 0 ){
            Models.Users.getUserByEmail(term, Models).then(function(user){
                if (user){
                    return res.status(200).send(Responses.success(user));
                } else {
                    return res.status(400).send(Responses.fail("No user found by that email"));
                }
            });
        } else {
            return res.status(400).send(Responses.fail("No user found"));
        }
    });

    app.get("/user/:term/course", (req, res) => {
        const term = req.params.term;

        if (!isNaN(parseInt(term, 10))){
            Models.Users.getUserByIdIncludingCourses(term, Models).then(function(user){
                if (user){
                    return res.status(200).send(Responses.success(user));
                } else {
                    return res.status(400).send(Responses.fail("No use found by that id"));
                }
            })
        } else if (term.indexOf("@") > 0){
            Models.Users.getUserByEmailIncludingCourses(term, Models).then(function(user){
                if (user){
                    return res.status(200).send(Responses.success(user));
                } else {
                    return res.status(400).send(Responses.fail("No user found by that email"));
                }
            });
        } else {
            return res.status(400).send(Responses.fail("No user found"));
        }
    });
}

