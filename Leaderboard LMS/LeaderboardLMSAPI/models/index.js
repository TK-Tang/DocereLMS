"use strict";

const path = require("path");
const Sequelize = require("sequelize");
const fs = require("fs");

const sequelizeCredentials = new Sequelize("DocereLMS", "postgres", "24157817", {
    host: "localhost",
    port: "5432",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
});

const db = {};

fs.readdirSync(__dirname).filter(function(file){
    return (file.indexOf(".") !== 0) && (file !== "index.js")
}).forEach (function (file){
    const model = sequelizeCredentials.import(path.join(__dirname, file));
    db[model.name] = model;
});

db.sequelizeCredentials = sequelizeCredentials;
db.Sequelize = Sequelize;

db.Users = require("./users")(sequelizeCredentials, Sequelize);
db.Roles = require("./roles")(sequelizeCredentials, Sequelize);
db.Courses = require("./courses")(sequelizeCredentials, Sequelize);
db.Invitations = require("./invitations")(sequelizeCredentials, Sequelize);

db.Forums = require("./forums")(sequelizeCredentials, Sequelize);
db.Topics = require("./topics")(sequelizeCredentials, Sequelize);
db.Posts = require("./posts")(sequelizeCredentials, Sequelize);
db.Upvotes = require("./upvotes")(sequelizeCredentials, Sequelize);

db.Channels = require("./channels")(sequelizeCredentials, Sequelize);
db.Chats = require("./chats")(sequelizeCredentials, Sequelize);

db.Resources = require("./resources")(sequelizeCredentials, Sequelize);
db.Categories = require("./categories")(sequelizeCredentials, Sequelize);

db.Leaderboards = require("./leaderboards")(sequelizeCredentials, Sequelize);
db.RankingSections = require("./ranking-sections")(sequelizeCredentials, Sequelize);
db.Rankings = require("./rankings")(sequelizeCredentials, Sequelize);
db.RankingSectionEntries = require("./ranking-section-entries")(sequelizeCredentials, Sequelize);
db.StudentAnonymitySettings = require("./student-anonymity-settings")(sequelizeCredentials, Sequelize);

db.Roles.belongsTo(db.Users, {foreignKey: "user_id"});
db.Roles.belongsTo(db.Courses, {foreignKey: "course_id"});
db.Courses.belongsToMany(db.Users, { through: "Roles" });
db.Users.belongsToMany(db.Courses, { through: "Roles" });
db.Courses.hasMany(db.Roles);
db.Users.hasMany(db.Roles);


db.Courses.hasMany(db.Invitations);
db.Invitations.belongsTo(db.Courses, { foreignKey: "course_id" });

db.Courses.hasMany(db.Forums);
db.Forums.belongsTo(db.Courses, { foreignKey: "course_id" });

db.Forums.hasMany(db.Topics);
db.Users.hasMany(db.Topics);
db.Topics.belongsTo(db.Forums, { foreignKey: "forum_id" });
db.Topics.belongsTo(db.Users, { foreignKey: "user_id" });

db.Topics.hasMany(db.Posts);
db.Users.hasMany(db.Posts);
db.Posts.belongsTo(db.Topics, { foreignKey: "topic_id" });
db.Posts.belongsTo(db.Users, { foreignKey: "user_id" });

db.Posts.hasMany(db.Upvotes);
db.Upvotes.belongsTo(db.Posts, { foreignKey: "post_id" });

db.Courses.hasMany(db.Channels);
db.Channels.belongsTo(db.Courses, { foreignKey: "course_id" });

db.Channels.hasMany(db.Chats);
db.Users.hasMany(db.Chats);
db.Chats.belongsTo(db.Channels, { foreignKey: "channel_id" });
db.Chats.belongsTo(db.Users, { foreignKey: "user_id" });

db.Courses.hasMany(db.Categories);
db.Categories.belongsTo(db.Courses, { foreignKey: "course_id" });

db.Categories.hasMany(db.Resources);
db.Resources.belongsTo(db.Categories);

db.Courses.hasMany(db.Leaderboards);
db.Leaderboards.belongsTo(db.Courses, { foreignKey: "course_id"});

db.Leaderboards.hasMany(db.Rankings);
db.Users.hasMany(db.Rankings);
db.Rankings.belongsTo(db.Leaderboards, { foreignKey: "leaderboard_id"});
db.Rankings.belongsTo(db.Users, { foreignKey: "user_id"});

db.Leaderboards.hasMany(db.RankingSections);
db.RankingSections.belongsTo(db.Leaderboards, { foreignKey: "leaderboard_id"});

db.RankingSections.hasMany(db.RankingSectionEntries);
db.RankingSectionEntries.belongsTo(db.RankingSections, {foreignKey: "ranking_section_id"})

db.Rankings.hasMany(db.RankingSectionEntries);
db.RankingSectionEntries.belongsTo(db.Rankings, { foreignKey: "ranking_id"});

db.Rankings.hasOne(db.StudentAnonymitySettings);
db.StudentAnonymitySettings.belongsTo(db.Rankings, { foreignKey: "ranking_id"});

module.exports = db;