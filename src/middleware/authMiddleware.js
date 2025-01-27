const jwt=require("jsonwebtoken");

const authenticateUser=(req,res,next)=>{
    const bearerToken=req.header("Authorization")
    const token=bearerToken.split(' ')[1]

    if(!token){
        return res.status(401).json({error: "Access denied"})
    }
    try{
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified;
        next();
    }catch(err){
        res.status(400).json({error:"Invalid token"})
    }
};

module.exports = authenticateUser;