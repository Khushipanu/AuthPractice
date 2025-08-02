//jwt verification
const jwt=require("jsonwebtoken");
require("dotenv").config();
const authMiddleware=(req,res,next)=>{ //koi bhi use API pr aaga it ll check ki tumhare pass token hia ya nhi
    const authHeader=req.headers.authorization; //tumhare pocket mai token hai kya???
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({msg:"No token provided"}) //you cant't enter

    }
    const token=authHeader.split(" ")[1];  //token
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded //gatekeeper bolega tum sahi ho
        next()
    }catch(err){
        res.status(401).json({msg:"Invalid or expired token"})
    }

}
module.exports=authMiddleware