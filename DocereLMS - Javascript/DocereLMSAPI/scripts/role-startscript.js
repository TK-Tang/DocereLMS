const Models = require("../Models");

module.exports.roleScript = function(){
    var roleList = {};

    roleList.role001 = {
        rank: "admin",
        user_id: 1
    };

    roleList.role002 = {
        user_id: 2,
        rank: "student"
    };

    roleList.role003 = {
        user_id: 3,
        rank: "student"
    };

    for (var key in roleList){
        var role = roleList[key]
        Models.Roles.create(role);
    };
}