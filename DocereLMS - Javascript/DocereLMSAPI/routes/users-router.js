const Responses = require("../helpers/response");
const Models = require("../models");

module.exports = function(app){
    app.get("/users/:term"), (req, res) => {
        const term = req.params.term;

        Models.Users.getUserByUsername(term, Models).then(function(user){
            if (!user){ return res.status(200).send(Responses.fail("Users by that username not found")); }
            return res.status(400).send(Responses.success(user));
        });
    }
}