const model = require("../prismaClient");

const addComment = async(req,res)=>{
    const { postId, author, email, content } = req.body;
    try {
        const comment=await model.addCommentModel(postId, author, email, content)
        res.json(comment)
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