const bCrypt = require("bcrypt-nodejs");
const Models = require("../models");

module.exports = function(passportApp, userModel){
    var LocalStrategy = require('passport-local').Strategy;

    passportApp.serializeUser(function(user, done){
        done(null, user.id);
    });

    passportApp.deserializeUser(function(id, done){
        userModel.findById(id).then(function(user){
            if (user){
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passportApp.use("local-signup", new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        }, 
        function(req, email, password, done){

            Promise.all([Models.Invitations.getByLink(req.params.link), userModel.getUser(null, email, Models)]).then(([link, user]) => {
                var generateHash = function(password){ return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null); };
                
                if (!link){ return done({ message: "Invalid invitation link"}, false); }

                Models.Courses.getCourseIncludeUser(link.course_id, null, email, Models).then(function(course){
                    if (course && course.Users[0].email == email){
                        return done("User already registered to this course", null);
                    }

                    if (user){
                        console.log("Email exists. Registering user to course.");
                        Models.Roles.insert(link.course_id, user.id, "student").then(function(role){
                            if (!role){
                                return done("Error registering user to course ", false);
                            } else {
                                return done(null, user);
                            }
                        });
                    } else {
                        var userPassword = generateHash(password);
                        var data = { email: email, password: userPassword };
    
                        userModel.create(data).then(function(newUser){
                            if (!newUser){
                                return done({ message: "Error creating new user"}, false);
                            }
    
                            Models.Roles.insert(link.course_id, newUser.id, "student").then(function(role){
                                if (!role){
                                    return done("Error registering user to course", false);
                                } else {
                                    return done(null , newUser);
                                }
                            });
                        });
                    }
                });
            });
        })
    );

    passportApp.use("local-signin", new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },

        function(req, email, password, done){
            var isValidPassword = function(userpass, password){
                return bCrypt.compareSync(password, userpass);
            }

            userModel.getUser(null, email, Models).then(function(user){
                if (!user){
                    return done("Email does not exist", false);
                }

                if (!isValidPassword(user.password, password)){
                    return done("Incorrect password", false);
                }

                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function(err){
                console.log("Error: ", err);
                return done("Error with signing in", false);
            });
        }
    ));
}