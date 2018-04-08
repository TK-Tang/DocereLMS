module.exports = function(sequelize, Sequelize){
    const Posts = sequelize.define("Posts", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER,
            field: "post_id"
        },

        content: {
            type: Sequelize.STRING(2048),
        },

        wasEdited: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    }, { underscored: true });

    Posts.getPostByUser = async function(user_id){
        return this.findAll({
            where: {
                user_id: user_id
            }
        });
    }

    Posts.getPost = async function(post_id){
        return this.findOne({
            where: {
                post_id: post_id
            }
        });
    }

    Posts.insertPost = async function(user_id, topic_id, content){
        const post = {
            user_id: user_id,
            topic_id: topic_id,
            content: content
        }

        return await this.create(post);
    }

    Posts.updatePost = async function(post_id, content, wasEdited){
        const postDetails = {
            post_id: post_id,
            content: content,
            wasEdited: wasEdited
        }

        const currentPost = await Post.findOne({
            where: { post_id: post_id }
        });

        if (!currentPost){ return null; }
        const updatedPost = await Post.updateAttributes(postDetails);
        
        return updatedPost;
    }

    Posts.deletePost = async function(post_id){
        const post = await this.findOne({
            where: { post_id: post_id }
        });

        const destroyed = await this.destroy({
            where: { post_id: post_id }
        });

        if (destroyed != 1){
            throw new Error("Expected one post to be deleted. Instead, " + destroyed + " posts were deleted."); 
        } else {
            return post;
        }
    }

    return Posts;
}