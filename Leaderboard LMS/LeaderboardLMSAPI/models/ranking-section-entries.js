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

    RankingSectionEntries.getRankingSectionEntries = async function(ranking_id, Models){
        return await this.findOne({
            where: { ranking_id, ranking_id },
            include: [
                {
                    model: Models.RankingSections
                }
            ]
        });
    }

    RankingSectionEntries.insertRankingSectionEntry = async function(ranking_id, ranking_section_id, mark){
        const rankingSectionEntry = {
            ranking_id: ranking_id,
            ranking_section_id: ranking_section_id,
            mark: mark
        }

        return await this.create(rankingSectionEntry);
    }

    RankingSectionEntries.updateRankingSectionEntry = async function(ranking_section_entry_id, mark){
        const t = await sequelize.transaction();

        currentRankingSectionEntry = await RankingSectionEntries.findOne({
            where: { ranking_section_entry_id: ranking_section_entry_id}
        }, {transaction: t});

        if(!currentRankingSectionEntry){ return null; }
        const updatedRankingSectionEntry = await currentRankingSectionEntry.updateAttributes({ mark }, {transaction: t});
        t.commit();

        return updatedBankingSectionEntry;
    }

    RankingSectionEntries.deleteRankingSectionEntry = async function(ranking_section_entry_id){
        return await this.destroy({
            where: {
                ranking_section_entry_id: ranking_section_entry_id
            }
        });
    }

    return RankingSectionEntries
}