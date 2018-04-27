module.exports = function(sequelize, Sequelize){
    const Examinables = sequelize.define("Examinables", {
        id: {
            autoIncrement: true, 
            primaryKey: true,
            type: Sequelize.INTEGER,
            field: "examinable_id"
        },

        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        mark: {
            type: Sequelize.INTEGER,
            notEmpty: true
        }
    }, { underscored: true });

    return Examinables;
}