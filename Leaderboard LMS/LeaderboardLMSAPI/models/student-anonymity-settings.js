module.exports = function(sequelize, Sequelize){
    const StudentAnonymitySettings = sequelize.define("StudentAnonymitySettings", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "student_anonymity_settings_id"
        },

        revealLeaderboardName: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

        revealLeaderboardRankingSections: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, { underscored: true});

    StudentAnonymitySettings.getStudentAnonymitySettings = async function(student_anonymity_settings_id){
        return await this.findOne({ 
            where: { student_anonymity_settings_id: student_anonymity_settings_id }
        });
    };

    StudentAnonymitySettings.insertStudentAnonymitySettings = async function(revealLeaderboardName, revealLeaderboardRankingSections){
        const studentAnonymitySettings = {
            revealLeaderboardName: revealLeaderboardName,
            revealLeaderboardRankingSections: revealLeaderboardRankingSections
        }

        return await this.create(studentAnonymitySettings);
    }

    StudentAnonymitySettings.updateStudentAnonymitySettings = async function(student_anonymity_settings_id, revealLeaderboardName, revealLeaderboardRankingSections){
        const studentAnonymitySettingsDetails = {
            revealLeaderboardName: revealLeaderboardName,
            revealLeaderboardRankingSections: revealLeaderboardRankingSections
        }

        const t = await sequelize.transaction();
        const currentStudentAnonymitySettings = await StudentAnonymitySettings.findOne({
            where: { student_anonymity_settings_id: student_anonymity_settings_id }
        }, {transaction: t});

        if (!currentStudentAnonymitySettings){ return null; }
        const updatedStudentAnonymitySettings = await currentStudentAnonymitySettings.updateAttributes(studentAnonymitySettingsDetails, {transaction: t});
        t.commit();

        return updatedStudentAnonymitySettings;
    }


    return StudentAnonymitySettings;
}