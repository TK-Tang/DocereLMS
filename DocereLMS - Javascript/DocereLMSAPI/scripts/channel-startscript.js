module.exports.startScript = function(){
    var channelList = {};

    channelList.channel001 = {
        name: "General Discussion",
        description: "",
        course_id: 7
    };

    channelList.channel002 = {
        name: "Tutorial Discussion",
        description: "Tutorial related inquiries",
        course_id: 6
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
        order: 10,
        course_id: 1
    };

    channelList.channel005 = {
        name: "Announcements board",
        description: "",
        viewChannelOnly: true,
        order: 9,
        course_id: 1
    };

    channelList.channel006 = {
        name: "Introduce yourself",
        description: "",
        viewChannelOnly: true,
        order: 8,
        course_id: 1
    };

    channelList.channel007 = {
        name: "Assignments Discussion",
        description: "",
        viewChannelOnly: true,
        order: 5,
        course_id: 1
    };
    
    return channelList;
}