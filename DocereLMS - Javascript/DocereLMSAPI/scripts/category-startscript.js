module.exports.startScript = function(){
    var categoryList = {};

    categoryList.category001 = {
        name: "Tutorial materials",
        description: "Tutorial questions and answers",
        adminOnly: "false",
        course_id: 1
    }

    categoryList.category002 = {
        name: "Lecture slides",
        description: "Lecture PDF slides",
        adminOnly: "false",
        course_id: 1
    }

    categoryList.category003 = {
        name: "Installation guidelines",
        description: "Guidelines for getting the right software installed and configured",
        adminOnly: "false",
        course_id: 2
    }

    categoryList.category004 = {
        name: "Laboratory materials",
        description: "Laboratory tutorial materials",
        adminOnly: "false",
        course_id: 2
    }

    return categoryList;
}