const express = require("express");
const { createPost, getAllPosts,publishPost, deletePost ,editPost,unpublishPost} = require("../controllers/postController");
const authenticateUser = require("../middleware/authMiddleware");

const router=express.Router();

router.post("/",authenticateUser,createPost);
router.post("/publish",authenticateUser,publishPost)
router.post("/unpublish",authenticateUser,unpublishPost)
router.post("/:postId/delete",deletePost)
router.post("/update",editPost)
router.get("/",getAllPosts);

module.exports=router;