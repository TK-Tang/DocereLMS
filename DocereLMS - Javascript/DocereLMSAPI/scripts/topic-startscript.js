module.exports.startScript = function(){
    var topicList = {};

    topicList.post001 = {
        title: "Help with question 3 of week 2 tutorial",
        content: "Can anyone explain how the answer is worked out in question 3?",
        forum_id: 2
    };

    topicList.post002 = {
        title: "Checking Java version",
        content: "How do I check the version of java quickly on my laptop?",
        forum_id: 2
    };

    topicList.post003 = {
        title: "Welcome to INFO1105",
        content: "Welcome to INFO1105 forums. You'll find the tutorial answers have already been released for this week.",
        isLocked: true,
        editedByAdmin: true,
        forum_id: 4
    };

    return topicList;
}