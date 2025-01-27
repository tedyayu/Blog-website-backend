const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerUserModel= async(username,email,hashedPassword)=>{
    const user=await prisma.user.create({
        data:{username,email,password: hashedPassword}
    })
    return user;
}

const getUserByEmailModel=async(email)=>{
    const user=await prisma.user.findUnique({
        where:{email:email}
    })
    return user
}

const createPostModel=async(title, content, published)=>{
    const post=await prisma.post.create({
        data:{title,content,published,authorId}
    })
    return post;
}


const getAllPostsModel=async()=>{
    const post=await prisma.post.findMany({where:{published:true}})
    return post;
}


const addCommentModel=async(postId, author, email, content)=>{
    const comment=await prisma.comment.create({
        data:{postId,author,email,content}
    })
    return comment;
}


const getCommentsModel=async(postId)=>{
    const comments=await prisma.comment.findMany({
        where:{postId: parseInt(postId)}
    })
    return comments;
}

module.exports = {registerUserModel,
    getUserByEmailModel,
    createPostModel,
    getAllPostsModel,
    addCommentModel,
    getCommentsModel}
