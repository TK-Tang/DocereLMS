module.exports = function(sequelize, Sequelize){
    const RankingSectionEntries = sequelize.define("RankingSectionEntries", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "ranking_section_entry_id"
        }, 

        mark: {
            type: Sequelize.STRING,
            notEmpty: true
        }
    }, { underscored: true });

    return RankingSectionEntries
}