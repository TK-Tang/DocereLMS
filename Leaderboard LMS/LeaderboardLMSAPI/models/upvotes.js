module.exports = function(sequelize, Sequelize){
    const Upvotes = sequelize.define("Upvotes", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            field: "upvote_id"
        },
    }, { underscored: true });

    Upvotes.getUpvotesByPost = async function(post_id){
        return await this.findAll({
            where: {
                post_id: post_id
            }
        });
    }

    Upvotes.getUpvotesCastByUser = async function(user_id){
        return this.findAll({
            where: {
                user_id: user_id
            }
        });
    }

    Upvotes.getUpvotesReceivedByUser = async function(user_id, models){
        const postList = await models.Posts.findPostsByUsers(user_id, models);
        var upvoteCount = 0
        
        
        postList.forEach(function(p){
            
        });

        // Not yet implemented

        return null;
    }

    Upvotes.insertUpvote = async function(user_id, post_id){
        const upvoteDetails = {
            user_id: user_id,
            post_id: post_id
        }

        return this.create(upvoteDetails);
    }

    Upvotes.deleteUpvote = async function(user_id, post_id){
        return await this.destroy({
            where: {
                user_id: user_id,
                post_id: post_id 
            }
        });
    }

    return Upvotes;
}