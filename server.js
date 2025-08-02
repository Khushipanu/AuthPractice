const express=require("express");
const app=express();
const main=require("./configs/mongodb.config")
main()
const UserRouter=require("./routes/user.router")
const ProfileRouter=require("./routes/profile.router")
require("dotenv").config()
const port=process.env.PORT;
app.use(express.json())
app.use("/users",UserRouter);
app.use("/users",ProfileRouter);

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})


