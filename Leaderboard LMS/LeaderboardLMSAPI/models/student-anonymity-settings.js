module.exports = function(sequelize, Sequelize){
    const StudentAnonymitySettings = sequelize.define("StudentAnonymitySettings", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "student_anonymity_settings"
        },

        revealLeaderboardName: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

        revealLeaderboardExaminableSections: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, { underscored: true});

    return StudentAnonymitySettings;
}