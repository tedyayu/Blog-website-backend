const model = require("../prismaClient");

const addComment = async(req,res)=>{
    const { postId, comment } = req.body;
    try {
        const createdComment=await model.addCommentModel(postId, comment)
        res.json(createdComment)
    } catch (err) {
        res.status(400).json({error: "Error adding comment"})
    }
}

const getComments=async (req,res)=>{
    const { postId } = req.params;
    const comments=await model.getCommentsModel(postId)
    res.json(comments);
};

module.exports = { addComment, getComments };