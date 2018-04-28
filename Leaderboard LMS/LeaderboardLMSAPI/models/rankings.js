module.exports = function(sequelize, Sequelize){
    const Rankings = sequelize.define("Rankings", {
        id: {
            autoIncrement: true, 
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "ranking_id"
        },

        note: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        mark: {
            type: Sequelize.INTEGER,
            notEmpty: true
        }
    }, { underscored: true });

    Rankings.getRankingIncludingStudentAnonymitySettings = async function(ranking_id, models){
        return await this.findOne({
            where: { ranking_id: ranking_id }, 
            include: [
                {
                    model: models.StudentAnonymitySettings,
                    model: models.RankingSections,
                    model: models.User
                }
            ]
        });
    }

    Rankings.insertRanking = async function(leaderboard_id, user_id, note, mark, models){
        const ranking = {
            leaderboard_id: leaderboard_id,
            user_id: user_id,
            note: note,
            mark: mark
        };

        var newRanking = await this.create(ranking);

        const studentAnonymitySettings = {
            ranking_id: newRanking.ranking_id,
            revealLeaderboardName: false,
            revealLeaderboardRankingSections: false
        }

        models.StudentAnonymitySettings.create(studentAnonymitySettings);

        return newRanking;
    }

    Rankings.updateRanking = async function(ranking_id, note, mark){
        const rankingDetails = {
            note: note,
            mark: mark
        }

        const t = await sequelize.transaction();
        const currentRanking = await Rankings.findOne({
            where: { ranking_id: ranking_id }
        }, { transaction: t });

        if (!currentRanking){ return null; }
        const updatedRanking = await currentRanking.updateAttributes(rankingDetails, { transaction: t });
        t.commit();

        return updatedRanking;
    }

    Rankings.deleteRanking = async function(ranking_id, models){
        const t = await sequelize.transaction();

        var numberOfStudentAnonymitySettingsDeleted= await models.StudentAnonymitySettings.destroy({
            where: { ranking_id: ranking_id }
        }, {transaction: t});

        var numberOfRankingsDeleted = await this.destroy({
            where: {
                ranking_id: ranking_id
            }
        }, {transaction: t});
        t.commit();

        return numberOfRankingsDeleted;
    }

    return Rankings;
}