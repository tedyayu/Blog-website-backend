const model=require("../prismaClient")

const createPost=async (req,res)=>{
    const {title, content, published} = req.body
    const {authorId}=req.user.id
    try{
        const post=await model.createPostModel(title, content, published,authorId);
        res.json(post);
    }catch(err){
        res.status(400).json({ error: "Error creating post" });
    }
};

const getAllPosts=async (req,res)=>{
    const posts=await model.getAllPostsModel()
    res.json(posts)
};

module.exports={createPost,getAllPosts}