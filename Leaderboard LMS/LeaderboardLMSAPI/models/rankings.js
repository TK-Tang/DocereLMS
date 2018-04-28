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
                    model: models.StudentAnonymitySettings
                }
            ]
        });
    }

    Rankings.insertRanking = async function(leaderboard_id, note, mark, models){
        const t = await sequelize.transaction();
        const ranking = {
            leaderboard_id,
            note: note,
            mark: mark
        };

        const studentAnonymitySettings = {
            revealLeaderboardName: false,
            revealLeaderboardRankingSections: false
        }

        Models.StudentAnonymitySettings.create(studentAnonymitySettings, {transaction: t});
        var newRanking = await this.create(ranking, {transaction: t});
        t.commit();

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
            where: { student_anonymity_settings_id: student_anonymity_settings_id }
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