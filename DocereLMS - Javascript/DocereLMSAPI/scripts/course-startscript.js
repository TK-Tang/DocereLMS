const Models = require("../models");

module.exports.startScript = function(){
    var courseList = {};

    courseList.course001 = {
        name: "INFO1103",
        description: "Introductory programming course",
        coordinator: "Dong Yuan",
        pictureLink: "https://upload.wikimedia.org/wikipedia/en/thumb/6/62/University_of_Sydney.svg/1200px-University_of_Sydney.svg.png",
        allowInvitations: true
    }

    courseList.course002 = {
        name: "INFO1105",
        description: "Data Structures",
        coordinator: "Dong Yuan",
        pictureLink: "https://upload.wikimedia.org/wikipedia/en/thumb/6/62/University_of_Sydney.svg/1200px-University_of_Sydney.svg.png",
        allowInvitations: true
    }

    return courseList;
}