const express=require("express");
const ProfileRouter=express.Router();
const UserModel=require("../models/user.model")
const authMiddleware=require("../middlewares/auth.middleware")
//protected route
ProfileRouter.get("/profile",authMiddleware,(req,res)=>{
    const {userId,name}=req.user;
    res.status(200).json({
        msg:`welcome ${name}`,
        userId,
    })

})
module.exports=ProfileRouter;