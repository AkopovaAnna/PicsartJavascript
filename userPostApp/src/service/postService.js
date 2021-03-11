const Post = require('../model/post');
const validate = require('../validation/validatePost').validatePost;


const PostService = {
    createPost: async (post) => {
        const {errors, isValid} = await validate(post);
        if (!isValid) {
            throw new Error(errors);
        } else {
            await post.save();
        }
    },

    updatePost: async (id, postData) => {
        const {errors, isValid} = await validate(postData);
        if (!isValid) {
            throw new Error(JSON.stringify(errors));
        } else {
            let post = await Post.findByIdAndUpdate(id, postData, {new: true});
            if (!post) {
                throw new Error("No post");
            }
            return post;
        }
    },

    getAllPosts: async () => {
        await Post.find();
    },

    getPostById: async (id) => {
        let result = await Post.findById(id);
        return result;
    },

    getPostsByUserId: async (id) => {
        let result = await Post.find({userId: id});
        return result;
    },

    getRecentPosts: async () => {
        let res
            = Post.find({})
            .sort({dateCreated: -1})
            .limit(3)
        return res;
    },

    getPostByDesc: async (search_key) => {
        return Post.find({
            description: {"$regex": search_key, "$options": "i"}
        },)
            .limit(3);
    },

    getPhotos: async (id) => {
        let posts = await Post.findById(id);
        return posts.images;
    },

    deletePhoto: async (id, photoId) => {
        await Post.findByIdAndUpdate({_id: id}, {$pull: {images: photoId}});
    },

    delete: async (id) => {
        await Post.findByIdAndRemove(id);
    },
};

module.exports = PostService;