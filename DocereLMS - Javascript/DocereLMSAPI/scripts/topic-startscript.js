module.exports.startScript = function(){
    var topicList = {};

    topicList.topic001 = {
        title: "Welcome to INFO1103",
        isLocked: true,
        isPinned: true,
        user_id: 1,
        forum_id: 1
    };

    topicList.topic002 = {
        title: "Checking Java version",
        user_id: 6,
        forum_id: 2
    };

    topicList.topic002 = {
        title: "Is Java a good programming language?",
        user_id: 3,
        forum_id: 2
    };

    topicList.topic003 = {
        title: "Help with question 3 of week 2 tutorial",
        user_id: 4,
        forum_id: 3
    };

    topicList.topic004 = {
        title: "Are tutorials worth marks?",
        user_id: 5,
        forum_id: 3
    };

    topicList.topic005 = {
        title: "When is the first assignment released?",
        user_id: 5,
        forum_id: 4
    };

    topicList.topic006 = {
        title: "Electric Boogaloo - The Ride Never Ends",
        user_id: 5,
        forum_id: 5
    }

    topicList.topic007 = {
        title: "Welcome to INFO1105",
        isLocked: true,
        isPinned: true,
        user_id: 1,
        forum_id: 6
    };

    return topicList;
}