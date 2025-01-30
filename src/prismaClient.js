const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerUserModel= async(username,email,hashedPassword)=>{
    try {
        const user=await prisma.user.create({
            data:{username,email,password: hashedPassword}
        })
        return user;
    } catch (error) {
        console.error("Error registering user:", error);
        throw new Error("Could not register user");
    }
    
}

const getUserByEmailModel=async(email)=>{
    try {
        const user=await prisma.user.findUnique({
            where:{email:email}
        })
        return user
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw new Error("Could not fetch user");
    }
    
}

const createPostModel=async(title, content, published,authorId)=>{
    try {
        const post=await prisma.post.create({
            data:{title,content,published,authorId:parseInt(authorId)}
        })
        return post;
    } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Could not create post");
    }
    
}

const publishPostModel=async (postId)=>{
    const post=await prisma.post.update({
        where:{id:postId},
        data:{published:true}
    })
    return post
}
const unpublishPostModel=async (postId)=>{
    const post=await prisma.post.update({
        where:{id:postId},
        data:{published:false}
    })
    return post
}

const deletePostModel= async (postId)=>{
    const post=await prisma.post.delete({
        where:{id:parseInt(postId)}
    })
    return post
}
const editPostModel=async (postId,formData)=>{
    const post=await prisma.post.update({
        where:{id:parseInt(postId)},
        data:{title:formData.title, content:formData.content, published:formData.published}
    })
    return post
}

const getAllPostsModel=async()=>{
    try {
        const post=await prisma.post.findMany({
            where:{published:true},
            include:{
                author:{
                    select:{username:true,email:true,}
                },comments:{
                    select:{content:true}
                }
        }})
        return post;
    } catch (error) {
        console.error("Error fetching all posts:", error);
        throw new Error("Could not fetch posts");
    }
    
}


const addCommentModel=async(postId, comment)=>{
    try {
        const theComment=await prisma.comment.create({
            data:{postId:parseInt(postId),content:comment}
        })
        return theComment;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw new Error("Could not add comment");
    }
    
}


const getCommentsModel=async(postId)=>{
    try {
        const comments=await prisma.comment.findMany({
            where:{postId: parseInt(postId)}
        })
        return comments;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw new Error("Could not fetch comments");
    }
    
}



module.exports = {
    registerUserModel,
    getUserByEmailModel,
    createPostModel,
    getAllPostsModel,
    addCommentModel,
    getCommentsModel,
    publishPostModel,
    unpublishPostModel,
    deletePostModel,
    editPostModel}
