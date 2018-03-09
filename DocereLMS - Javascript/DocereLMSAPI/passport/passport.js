const bCrypt = require("bcrypt-nodejs");

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

            var generateHash = function(password){
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            userModel.findOne({
                where: {
                    email: email
                }
            }).then(function(user){
                if (user){
                    return done(null, false, {
                        message: "That email is already taken"
                    });
                } else {
                    var userPassword = generateHash(password);

                    var data = {
                        email: email,
                        password: userPassword,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                    };

                    userModel.create(data).then(function(newUser, created){
                        if (!newUser){
                            return done(null, false)
                        } else {
                            return done(null, newUser);
                        }
                    });
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

            userModel.findOne({
                where: {
                    email: email
                }
            }).then(function(user){
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
                return done(null, false, {message: "Error with signing in"});
            });
        }
    ));
}