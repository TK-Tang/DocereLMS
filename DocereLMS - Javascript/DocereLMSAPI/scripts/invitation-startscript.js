module.exports.startScript = function(){
    var invitationList = {};

    invitationList.invitation000 = {
        link: "aaaaaaaaa",
        course_id: 1
    }

    invitationList.invitation001 = {
        link: generateInviteLink(),
        course_id: 1
    }

    invitationList.invitation002 = {
        link: generateInviteLink(),
        course_id: 2
    }
    
    return invitationList;
}

function generateInviteLink(){
    return Math.random().toString(36).substring(3,12);
}