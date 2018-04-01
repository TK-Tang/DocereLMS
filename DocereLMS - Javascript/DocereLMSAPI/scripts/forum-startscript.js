module.exports.startScript = function(){
    var forumList = {};

    forumList.forum001 = {
        name: "Board",
        order: 10,
        course_id: 1
    };

    forumList.forum002 = {
        name: "General Discussion",
        order: 9,
        course_id: 1,
    };

    forumList.forum003 = {
        name: "Tutorial Materials",
        order: 8,
        course_id: 1,
    };

    forumList.forum004 = {
        name: "Assignment Materials",
        order: 7,
        course_id: 1,
    };

    forumList.forum005 = {
        name: "Banter",
        order: 1,
        course_id: 1
    };

    forumList.forum006 = {
        name: "Board",
        order: 2,
        course_id: 2
    };

    forumList.forum007 = {
        name: "Discussion",
        order: 1,
        course_id: 2
    };
    
    return forumList;
}