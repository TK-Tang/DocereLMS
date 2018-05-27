const Responses = require("../helpers/response");
const Models = require("../models");

exports.getResources = function(req, res){
    const category_id = parseInt(req.params.category_id, 10);

    Models.Resources.getResources(category_id).then(function(resources){
        if (!resources){
            Responses.fail(res, "Course downloadable content could not be loaded", null);
        } else {
            Responses.success(res, "Courses downloadable content found", resources);
        }
    });
}