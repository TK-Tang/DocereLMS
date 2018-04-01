module.exports.startScript = function(){
    var channelList = {};
    
    channelList.channel001 = {
        name: "Staff",
        description: "Discussion and planning amongst tutors and lectures for the course roadmap",
        adminChannelOnly: true,
        order: 10,
        course_id: 1
    };

    channelList.channel002 = {
        name: "Announcements board",
        description: "Important notices go here",
        viewChannelOnly: true,
        order: 9,
        course_id: 1
    };

    channelList.channel003 = {
        name: "Introduce yourself",
        description: "Tell us your name, the degree you study and anything interesting about yourself",
        viewChannelOnly: true,
        order: 8,
        course_id: 1
    };

    channelList.channel004 = {
        name: "General Discussion",
        description: "",
        order: 7,
        course_id: 1
    };

    channelList.channel005 = {
        name: "Tutorial Discussion",
        description: "Tutorial related inquiries",
        order: 6,
        course_id: 1
    };

    channelList.channel006 = {
        name: "Assignments Discussion",
        description: "Assignment related questions and clarifications",
        viewChannelOnly: true,
        order: 5,
        course_id: 1
    };

    channelList.channel007 = {
        name: "Memes",
        description: "Non course related banter",
        course_id: 1
    };

    /* Course ID: 2 -- below -- */

    channelList.channel008 = {
        name: "Announcements board",
        description: "",
        viewChannelOnly: true,
        order: 9,
        course_id: 2
    };

    channelList.channel009 = {
        name: "General",
        description: "",
        course_id: 2
    };
    
    return channelList;
}