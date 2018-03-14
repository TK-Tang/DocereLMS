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

            Promise.all([Models.Invitations.getByLink(req.params.link), userModel.getUserExcludeRoles(email)]).then(([link, user]) => {
                var generateHash = function(password){ return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null); };
                
                if (!link){
                    console.log("Registration error - Invalid invitation link");
                    return done(null, false, { message: "Invalid invitation link"}); 
                }

                if (user){
                    console.log("Registrataion error - Email already in use")
                    return done(null, false, { message: "That email is already taken" });
                } else {
                    var userPassword = generateHash(password);
                    var data = { email: email, password: userPassword };

                    userModel.create(data).then(function(newUser, created){
                        if (!newUser){
                            console.log("Error creating new user");
                            return done(null, false, { message: "Error creating new user" });
                        }

                        Models.Roles.insert(link.course_id, newUser.id, "student").then(function(role){
                            if (!role){
                                console.log("Error registering user to course");
                                return done(null, false, { message: "Error registering user to course "});
                            } else {
                                return done(null , newUser);
                            }
                        })
                    })
                }
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

            userModel.getUserExcludeRoles(email).then(function(user){
                if (!user){
                    return done(null, false, {
                        message: "Email does not exist"
                    });
                }

                if (!isValidPassword(user.password, password)){
                    return done(null, false, {
                        message: "Incorrect password"
                    });
                }

                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function(err){
                console.log("Error: ", err);
                return done(null, false, { message: "Error with signing in" });
            });
        }
    ));
}