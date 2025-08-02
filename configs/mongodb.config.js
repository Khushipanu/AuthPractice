const mongoose=require("mongoose");
require("dotenv").config()
const main=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected")
    }catch(err){
        console.log("ERROR in connecting database")
        console.log(err.message)

    }
}
module.exports=main;