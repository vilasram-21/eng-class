import mongoose from "mongoose";

const mongoConnection=async()=>{
 try {
    const mongo_url=process.env.mongoUrl
     await mongoose.connect(mongo_url)
    console.log("database connected successfully")
 } catch (error) {
    console.log("error in connection")
 }
} 
export default mongoConnection   
       