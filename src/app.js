require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app=express();
app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);


const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`)
})