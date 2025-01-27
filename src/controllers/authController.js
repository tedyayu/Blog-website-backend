const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const model=require("../prismaClient")


const register=async (req,res)=>{
    const {username, email, password}=req.body;
    console.log("Register Request:", username, email);
    const hashedPassword =await bcrypt.hash(password,10);
    try{
        console.log("Registering user:", username, email);
        const user=await model.registerUserModel(username,email,hashedPassword);
        res.json({message:"User registered successfully!"});
    }catch(err){
        console.error("Registration Error:", err);
        res.status(400).json({ error: "User already exists" });
    }
}

const login=async(req,res)=>{
    const { email, password } = req.body;
    const user=await model.getUserByEmailModel(email)
    if(!user|| !(await bcrypt.compare(password,user.password))){
        res.status(401).json({error: "Invalid credentials"})
    }
    const token=jwt.sign({id:user.id, role:user.role}, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({token});
}

module.exports = { register, login };