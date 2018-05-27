module.exports = function(sequelize, Sequelize){
    const Resources = sequelize.define("Resources", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            field: "resource_id"
        },

        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        description: {
            type: Sequelize.STRING
        },

        path: {
            type: Sequelize.STRING(1024)
        },

        isPinned: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

        order: {
            type: Sequelize.INTEGER
        }
    }, { underscored: true });

    Resources.getResources = async function(category_id){
        return await this.findAll({
            where: {category_id: category_id}
        });
    }

    return Resources;
}