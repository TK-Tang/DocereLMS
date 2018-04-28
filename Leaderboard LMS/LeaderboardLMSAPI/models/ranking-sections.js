module.exports = function(sequelize, Sequelize){
    const RankingSections = sequelize.define("RankingSections", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "ranking_section_id"
        },

        name: {
            type: Sequelize.STRING
        }

    }, { underscored: true });

    RankingSections.getAllRankingSections = async function(leaderboard_id){
        return await this.findAll({
            where: { leaderboard_id: leaderboard_id }
        });
    };

    RankingSections.insertRankingSection = async function(name, leaderboard_id){
        return await this.create({ name });
    };

    RankingSections.updateRankingSection = async function(ranking_section_id, name, models){
        const t = await sequelize.transaction();
        const currentRankingSection = await RankingSections.findOne({
            where: { ranking_section_id }
        }, {transaction: t});

        if (!currentRankingSection){ return null; }
        const updatedRankingSection = currentRankingSection.updateAttributes({ name }, {transaction: t});
        t.commit();

        return updatedRankingSection;
    };

    RankingSections.deleteRankingSection = async function(ranking_section_id){
        return await this.destroy({
            where: {
                ranking_section_id: ranking_section_id
            }
        });
    };

    return RankingSections;
}