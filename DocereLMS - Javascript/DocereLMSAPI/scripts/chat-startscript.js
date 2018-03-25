module.exports.startScript = function(){
    var chatList = {};

    chatList.chat001 = {
        message: "Welcome to INFO1103. This is the announcement board!",
        isPinned: true,
        channel_id: 5,
        user_id: 1
    };

    chatList.chat002 = {
        message: "Feel free to explore and look around the course.",
        channel_id: 5,
        user_id: 1
    };

    chatList.chat003 = {
        message: "Where do I find the room labelled SIT114?",
        channel_id: 1,
        user_id: 4
    };

    return chatList;
}