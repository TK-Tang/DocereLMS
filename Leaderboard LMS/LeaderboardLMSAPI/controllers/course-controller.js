const Responses = require("../helpers/response");
const Models = require("../models");

exports.getCourse = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(course_id)){ Responses.error(res, "Course ID is not a number", null); }

    Models.Courses.getCourse(course_id).then(function(courses){
        if (!courses){
            Responses.fail(res, "Course not found", null);
        } else {
            Responses.success(res, "Courses found", courses);
        }
    });
};

exports.getCourseIncludingUser = function(req, res){
    var email = req.params.term;
    var user_id = parseInt(req.params.term, 10);
    const course_id = parseInt(req.params.course_id, 10)

    if (isNaN(course_id)){ Responses.error(res, "Course ID is not a number", null); }
    if (isNaN(user_id)){ Responses.error(res, "User ID is not a number", null); }

    Models.Courses.getCourseIncludeUser(course_id, user_id, email, Models).then(function(course){
        if (!course){
            Responses.fail(res, "Course with user not found", null);
        } else {
            Responses.success(res, "Course with user found", course);
        }
    });
};

exports.getCourseIncludingUsers = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(course_id)){ Responses.error(res, "Course ID is not a number", null); }

    Models.Courses.getCourseIncludingUsers(course_id, Models).then(function(courses){
        if (!courses){
            Responses.fail(res, "Course not found", null);
        } else {
            Responses.success(res, "Courses found", courses);
        }
    });
};

exports.getCourseIncludingStudents = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(course_id)){ Responses.error(res, "Course ID is not a number", null); }

    Models.Courses.getCourseIncludingUsersAndRank (course_id, "student", Models).then(function(courses){
        if (!courses){
            Responses.fail(res, "Course not found", null);
        } else {
            Responses.success(res, "Courses found", courses);
        }
    });
};

exports.getCourseIncludingAdmins = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(course_id)){ Responses.fail(res, "Course ID is not a number", null); }

    Models.Courses.getCourseIncludingUsersAndRank(course_id, "admin", Models).then(function(courses){
        if (!courses){
            Responses.fail(res, "Course not found", null);
        } else {
            Responses.success(res, "Courses found", courses);
        }
    });
};

exports.getCourseChannels = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(course_id)){ Responses.fail(res, "Course ID is not a number", null); }

    Models.Courses.getCourseIncludesChannels(course_id, Models).then(function(course){
        if(!course){
            Responses.fail(res, "Course not found", null);
        } else {
            Responses.success(res, "Course with channels found", course);
        }
    });
}

exports.getCourseForums = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(course_id)){ Response.fail(res, "Course ID is not a number", null); }

    Models.Courses.getCourseIncludesForums(course_id, Models).then(function(course){
        if(!course){
            Responses.fail(res, "Course not found", null);
        } else {
            Responses.success(res, "Course with forums found", course);
        }
    })
}

exports.getCourseCategories = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);
    if (isNaN(course_id)){ Response.fail(res, "Course ID is not a number", null); }

    Models.Courses.getCourseIncludesCategories(course_id, Models).then(function(course){
        if(!course){
            Responses.fail(res, "Course not found", null);
        } else {
            Responses.success(res, "Course with categories found", course);
        }
    });
}

exports.getCourseLeaderboards = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);
    
    Models.Courses.getCourseIncludesLeaderboards(course_id, Models).then(function(course){
        if(!course){
            Responses.fail(res, "Course not found", null);
        } else {
            Responses.success(res, "Course with leaderboards found", course);
        }
    });
}

exports.insertCourse = function(req, res){
    const user_id = req.user.id;
    const email = req.user.email;
    const name = req.body.name;
    const description = req.body.description;
    const coordinator = req.body.coordinator;
    const pictureLink = req.body.pictureLink;
    const allowInvitations = req.body.allowInvitations;

    if(!name){
        Responses.fail(res, "Your new course needs a name"), null;
        return;
    }
    Models.Courses.insertCourse(user_id, email, name, description, coordinator, pictureLink, allowInvitations, Models).then(function(course){
        if (!course){
            Responses.fail(res, "Sorry. It seems as though that a new course server cannot be created at this time.", null);
        } else {
            Responses.success(res, "Courses created", course);
        }
    });
}

exports.updateCourse = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);
    const name = req.body.name;
    const description = req.body.name;
    const coordinator = req.body.coordinator;
    const pictureLink = req.body.pictureLink;
    const allowInvitations = req.body.allowInvitations;

    Models.Courses.updateCourse(course_id, name, description, coordinator, pictureLink, allowInvitations, Models).then(function(course){
        if(!course){
            Responses.fail(res, "Course could not be updated", null);
        } else {
            Responses.success(res, "Course updated", course);
        }
    });
}

exports.toggleActivation = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);
    const isActive = req.body.isActive;

    Models.Courses.toggleActivation(course_id, isActive).then(function(course){
        if(!course){
            Responses.fail(res, "Course could not be deactivated", null);
        } else {
            Responses.success(res, "Course deactivated", course);
        }
    });
}

exports.setUserAsAdmin = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);
    const user_id = parseInt(req.params.user_id, 10);

    Models.Courses.setUserAsAdmin(course_id, user_id, Models).then(function(course){
        if(!course){
            Responses.fail(res, "User could not be set as course admin", null);
        } else {
            Responses.success(res, "User successfully set as admin of course " + course.name, course);
        }
    });
}

exports.kickUser = function(req, res){
    const course_id = parseInt(req.params.course_id, 10);
    const user_id = parseInt(req.params.user_id);

    Models.Courses.kickUser(course_id, user_id, Models).then(function(user){
        if (!user){
            Responses.fail(res, "Failed to kick user. The user does not exist or they may not be registered anymore.", null);
        } else {
            Responses.success(res, user.email + " kicked", user);
        }
    });
}
    
