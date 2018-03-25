module.exports.startScript = function(){
    var channelList = {};

    channelList.channel001 = {
        name: "General Discussion",
        description: "",
        course_id: 1
    };

    channelList.channel002 = {
        name: "Tutorial Discussion",
        description: "Tutorial related inquiries",
        course_id: 1
    };

    channelList.channel003 = {
        name: "Memes",
        description: "Non course related banter",
        course_id: 1
    };

    channelList.channel004 = {
        name: "Staff",
        description: "",
        adminChannelOnly: true,
        order: 2,
        course_id: 1
    };

    channelList.channel005 = {
        name: "Announcements board",
        description: "",
        viewChannelOnly: true,
        order: 1,
        course_id: 1
    };

    channelList.channel006 = {
        name: "General",
        description: "",
        order: 1,
        course_id: 2
    };

    return channelList;
}