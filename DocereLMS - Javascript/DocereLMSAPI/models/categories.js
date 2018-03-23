module.exports = function(sequelize, Sequelize){
    const Categories = sequelize.define("Categories", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            field: "category_id"
        },

        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        description: {
            type: Sequelize.STRING
        },

        adminOnly: {
            type: Sequelize.BOOLEAN
        },

        order: {
            type: Sequelize.INTEGER
        }
    }, { underscored: true });

    return Categories;
}