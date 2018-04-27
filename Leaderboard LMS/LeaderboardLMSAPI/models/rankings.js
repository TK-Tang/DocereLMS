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

    Rankings.getRanking = async function(ranking_id){
        return await this.findOne({
            where: { ranking_id: ranking_id }
        });
    }

    Rankings.insertRanking = async function(note, mark){
        const ranking = {
            note: note,
            mark: mark
        };

        return await this.create(ranking)
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

    Rankings.deleteRanking = async function(ranking_id){
        return await this.destroy({
            where: {
                ranking_id: ranking_id
            }
        });
    }

    return Rankings;
}