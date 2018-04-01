module.exports.startScript = function(){
    var resourceList = {};

    resourceList.Resource001 = {
        name: "Tutorial week 2",
        description: "Includes answers",
        path: "C:\\Users\\TKTang\\Documents\\University\\INFO1103\\Week2",
        order: 1,
        category_id: 1
    };

    resourceList.Resource002 = {
        name: "Lecture week 1",
        description: "Includes answers",
        path: "C:\\Users\\TKTang\\Documents\\University\\INFO1103\\Week2",
        order: 1,
        category_id: 2
    };

    resourceList.Resource003 = {
        name: "Lecture week 2",
        description: "Includes worked out answers",
        path: "C:\\Users\\TKTang\\Documents\\University\\INFO1103\\Week2",
        order: 1,
        category_id: 2
    };

    return resourceList;
}