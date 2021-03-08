const service = require('../service/postService');
const handler = require('../utils/handler');
const jwtService = require('../service/jwtService');
const fs = require("fs");

const PostController = {

    createPost: async (req, res, next) => {
        try {
            const post = new Post(req.body);
            post.userId = req.user.id;
            post.images = PostController.upload(req, res, next)
            await service.createPost(post);
            handler.successHandler(post, req, res);
        } catch (err) {
            handler.errorHandler(err, req, res, 400);
        }
    },

    updatePost: async (req, res, next) => {
        try {
            let post = PostController.mapToObj(req, res, next);
            let decoded = await jwtService.verifyToken(req.token);
            if (decoded._id === req.params.postId) {
                let updatedPost = await service.updatePost(req.params.postId, post);
                handler.successHandler(updatedPost, req, res)
            } else {
                res.status(401).send("You are not authenticated");
            }
        } catch (err) {
            handler.errorHandler(err, req, res, 400);
        }
    },

    getAllPosts: async (req, res) => {
        try {
            let allPosts = await service.getAllPosts();
            handler.successHandler(allPosts, req, res);
        } catch (err) {
            handler.errorHandler(err, req, res, 400);
        }
    },

    getRecentPosts: async (req, res) => {
        try {
            let allPosts = await service.getRecentPosts();
            handler.successHandler(allPosts, req, res);
        } catch (err) {
            handler.errorHandler(err, req, res, 400);
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
            handler.successHandler(result, req, res);
        } catch (err) {
            handler.errorHandler(err, req, res, 400);
        }
    },

    getPostById: async (req, res) => {
        try {
            let result = await service.getPostById(req.params.postId);
            handler.successHandler(result, req, res);
        } catch (err) {
            handler.errorHandler(err, req, res, 400);
        }
    },

    getPhotos: async (req, res) => {
        try {
            let result = await service.getPhotos(req.params.postId);
            handler.successHandler(result, req, res);
        } catch (err) {
            handler.errorHandler(err, req, res, 400);
        }
    },

    getPostByUserId: async (req, res) => {
        try {
            let result = await service.getPostsByUserId(req.params.id);
            handler.successHandler(result, req, res);
        } catch (err) {
            handler.errorHandler(err, req, res, 400);
        }
    },

    getPostByDesc: async (req, res) => {
        try {
            let searchPrm = req.param('search');
            let searchKey = searchPrm.split('desc:')[1];
            let result = await service.getPostByDesc(searchKey);
            handler.successHandler(result, req, res);
        } catch (err) {
            handler.errorHandler(err, req, res, 400);
        }
    },

    deletePhoto: async (req, res) => {
        try {
            let decoded = await jwtService.verifyToken(req.token);
            if (decoded._id === req.params.postId) {
                await service.deletePhoto(req.params.postId, req.params.photoId);
                handler.successHandler("Photo removed", req, res);
            } else {
                res.status(401).send("You are not authenticated");
            }
        } catch (err) {
            handler.errorHandler(err, req, res, 400);
        }
    },

    deletePost: async (req, res) => {
        try {
            let decoded = await jwtService.verifyToken(req.token);
            if (decoded._id === req.params.postId) {
                await service.delete(req.params.postId);
                handler.successHandler(req.params.postId, req, res);
            } else {
                res.status(401).send("You are not authenticated");
            }

        } catch (err) {
            handler.errorHandler(err, req, res, 400);
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

    upload: (req, res, next) => {
        const files = req.files;
        if (!files) {
            return next("error");
        }

        return files.map((file) => {
            const img = fs.readFileSync(file.path);

            return {
                filename: file.originalname,
                mimeType: file.mimetype,
                contentType: img.toString('base64'), //newBuffer
            }
        });
    }
};

module.exports = PostController;