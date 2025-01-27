const express = require("express");
const { createPost, getAllPosts } = require("../controllers/postController");
const authenticateUser = require("../middleware/authMiddleware");

const router=express.Router();

router.post("/",authenticateUser,createPost);
router.get("/",getAllPosts);

module.exports=router;