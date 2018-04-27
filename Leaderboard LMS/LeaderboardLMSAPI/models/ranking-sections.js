module.exports = function(sequelize, Sequelize){
    const RankingSections = sequelize.define("RankingSections", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "rankingSectionId"
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

    return RankingSections
}