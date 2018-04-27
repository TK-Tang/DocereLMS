module.exports = function(sequelize, Sequelize){
    const ExaminableSections = sequelize.define("ExaminableSections", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "examinableSectionId"
        }, 

        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        mark: {
            type: Sequelize.STRING,
            notEmpty: true
        }
    }, { underscored: true });

    return ExaminableSections
}