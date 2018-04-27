module.exports = function(sequelize, Sequelize){
    const RankingSectionEntries = sequelize.define("RankingSectionEntries", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "ranking_section_entry_id"
        },

        name: {
            type: Sequelize.STRING
        }

    }, { underscored: true });

    RankingSectionEntries.getAllRankingSectionEntries = async function(leaderboard_id){
        return await this.findAll({
            where: { leaderboard_id: leaderboard_id }
        });
    }

    RankingSectionEntries.insertRankingSectionEntry = async function(name){
        return await this.create({ name });
    }

    RankingSectionEntries.updateRankingSectionEntry = async function(ranking_section_entry_id, name){
        const t = await sequelize.transaction();
        const currentRankingSectionEntry = await RankingSectionEntries.findOne({
            where: { ranking_section_entry_id }
        }, {transaction: t});

        if (!currentRankingSectionEntry){ return null; }
        const updatedRankingSectionEntry = currentRankingSectionEntry.updateAttributes({ name }, {transaction: t});
        t.commit();

        return updatedRankingSectionEntry;
    }

    RankingSectionEntries.deleteRankingSectionEntry = async function(ranking_section_entry_id){
        return await this.destroy({
            where: {
                ranking_section_entry_id: ranking_section_entry_id
            }
        });
    }

    return RankingSectionEntries;
}