module.exports = function(sequelize, Sequelize){
    const Invitations = sequelize.define("Invitations", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            field: "invitation_id"
        },

        link: {
            type: Sequelize.STRING
        }
    }, { underscored: true });

    // CREATE
    Invitations.insert = async function(invitation_id){
        const inv = { invitation_id: invitation_id }
        return await this.create(inv);
    }

    // READ
    Invitations.get = async function(invitation_id){
        return await this.findById(invitation_id);
    }

    Invitations.getByLink = async function(link){
        return await this.findOne({
            where: { link: link }
        })
    }

    // DELETE 
    Invitations.delete = async function(invitation_id){
        return await this.destroy({
            where: {
                invitation_id: invitation_id
            }
        });
    }

    return Invitations;
}