const service = require('../service/postService');
const errorHandler = require('../utils/handler').errorHandler;
const successHandler = require('../utils/handler').successHandler;
const jwtService = require('../service/jwtService');

const PostController = {

    createPost: async (req, res, next) => {
        try {
            const post = new Post(req.body);
            post.userId = req.user.id;
            post.images = PostController.upload(req, res, next)
            await service.createPost(post);
            successHandler(post, req, res);
        } catch (err) {
            errorHandler(err, req, res, 400);
        }
    },

    updatePost: async (req, res, next) => {
        try {
            let post = PostController.mapToObj(req, res, next);
            let updatedPost = await service.updatePost(req.params.postId, post);
            successHandler(updatedPost, req, res)
        } catch (err) {
            errorHandler(err, req, res, 400);
        }
    },

    getAllPosts: async (req, res) => {
        try {
            let allPosts = await service.getAllPosts();
            successHandler(allPosts, req, res);
        } catch (err) {
            errorHandler(err, req, res, 400);
        }
    },

    getRecentPosts: async (req, res) => {
        try {
            let allPosts = await service.getRecentPosts();
            successHandler(allPosts, req, res);
        } catch (err) {
            errorHandler(err, req, res, 400);
        }
    },

    getHandler: async (req, res) => {
        if (req.url.includes("?")) {
            let searchPrm = req.param('search');
            if (searchPrm.includes('desc:')) {
                await PostController.getPostByDesc(req, res)
            } else if (searchPrm === 'recent') {
                await PostController.getRecentPosts(req, res);
            }
        } else {
            await PostController.getPostByUserId(req, res);
        }
    },

    getUserPosts: async (req, res) => {
        try {
            let decoded = await jwtService.verifyToken(req.token);
            let result = await service.getPostsByUserId(decoded.id);
            successHandler(result, req, res);
        } catch (err) {
            errorHandler(err, req, res, 400);
        }
    },

    getPostById: async (req, res) => {
        try {
            let result = await service.getPostById(req.params.postId);
            successHandler(result, req, res);
        } catch (err) {
            errorHandler(err, req, res, 400);
        }
    },

    getPhotos: async (req, res) => {
        try {
            let result = await service.getPhotos(req.params.postId);
            successHandler(result, req, res);
        } catch (err) {
            errorHandler(err, req, res, 400);
        }
    },

    getPostByUserId: async (req, res) => {
        try {
            let result = await service.getPostsByUserId(req.params.id);
            successHandler(result, req, res);
        } catch (err) {
            errorHandler(err, req, res, 400);
        }
    },

    getPostByDesc: async (req, res) => {
        try {
            let searchPrm = req.param('search');
            let searchKey = searchPrm.split('desc:')[1];
            let result = await service.getPostByDesc(searchKey);
            successHandler(result, req, res);
        } catch (err) {
            errorHandler(err, req, res, 400);
        }
    },

    deletePhoto: async (req, res) => {
        try {
            await service.deletePhoto(req.params.postId, req.params.photoId);
            successHandler("Photo removed", req, res);
        } catch (err) {
            errorHandler(err, req, res, 400);
        }
    },

    deletePost: async (req, res) => {
        try {
            await service.delete(req.params.postId);
            successHandler({post: req.params.postId, title: req.body.title}, req, res);

        } catch (err) {
            errorHandler(err, req, res, 400);
        }
    },


    mapToObj: (req, res, next) => {
        let post = {};
        post.userId = req.params.id;
        post.title = req.body.title;
        post.description = req.body.description;
        post.dateUpdated = Date.now();
        post.images = PostController.upload(req, res, next);

        return post;
    },

    upload: (req) => {
        const files = req.files;
        if (files) {
            return files.map((file) => {
                return {
                    filename: Date.now() + '-' + file.originalname,
                    mimeType: file.mimetype,
                    contentType: `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
                }
            });
        }
    }
}

module.exports = PostController;