const express=require("express");
const UserRouter=express.Router();
require("dotenv").config()
const UserModel=require("../models/user.model")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const saltRounds=10;

UserRouter.post("/signup",async(req,res)=>{
    let {name,email,password}=req.body;
    //check if user already exist
    try{
        const existingUser=await UserModel.findOne({email})
        if(existingUser) return res.status(404).json({message:"User already exits"})
    //hash password
    const hashedPassword=await bcrypt.hash(password,10);

    const newUser=new UserModel({name,email,password:hashedPassword})
    await newUser.save();
    res.status(201).json({msg:"Signup successful"})
        }catch(err){
            res.status(500).json({msg:"signup failed"})

        }

})
//login route
UserRouter.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    try{
        console.log("incoming email",email);
        console.log("incoming password",password)
    const user=await UserModel.findOne({email});
   
    if(!user) return res.status(401).json({msg:"Invalid credentials"})
                console.log(user.password)

    const isMatch=await bcrypt.compare(password,user.password)
console.log("Password entered",password);
console.log("password hashed in DB",user.password);
    if(!isMatch)
         return res.status(401).json({msg:"Invalied credentails"})
    
    //token generate
    const token=jwt.sign(
        {userId:user._id,name:user.name},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}

    )
    res.status(200).json({msg:"Login successful",token})
}catch(err){
    console.log("error",err.message)
    res.status(500).json({msg:"Error during login"})
}
})
module.exports=UserRouter;