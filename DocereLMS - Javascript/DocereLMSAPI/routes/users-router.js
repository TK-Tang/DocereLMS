const Responses = require("../helpers/response");
const Models = require("../models");

module.exports = function(app){
    app.get("/users/:term", (req, res) => {
        const term = req.params.term;

        Models.Users.getUsersByUsername(term, Models).then(function(user){
            if (!user){ Responses.fail(res, "Users by that username not found", null); }
            Responses.success(res, "User/s found", user);
        });
    });
}