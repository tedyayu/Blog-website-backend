const model=require("../prismaClient")

const createPost=async (req,res)=>{
    const {title, content, published} = req.body
    const {id:authorId}=req.user
    try{
        const post=await model.createPostModel(title, content, published,authorId);
        res.json(post);
    }catch(err){
        res.status(400).json({ error: "Error creating post" });
    }
};

const getAllPosts=async (req,res)=>{
    try {
        const posts=await model.getAllPostsModel()
        res.json(posts)
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
    
};

const publishPost=async (req,res)=>{
    const {postId}=req.body
    const post=await model.publishPostModel(postId)
    res.json(post)
}

const unpublishPost=async (req,res)=>{
    const {postId}=req.body
    const post=await model.unpublishPostModel(postId)
    res.json(post)
}

const deletePost=async (req,res)=>{
    const { postId } = req.params;
    try {
        await model.deletePostModel(postId);
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const editPost=async (req,res)=>{
    const { formData}=req.body
    const {postId}=req.params
    try {
        const post=await model.editPostModel(postId, formData)
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: "Error editing post" });
    }
    
}

module.exports={createPost,getAllPosts,publishPost,unpublishPost,deletePost,editPost}