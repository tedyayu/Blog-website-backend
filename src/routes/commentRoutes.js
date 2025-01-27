const { addComment, getComments } = require("../controllers/commentController");

const express = require("express");

const router = express.Router();

router.post("/",addComment);
router.get("/:postId", getComments)

module.exports = router;