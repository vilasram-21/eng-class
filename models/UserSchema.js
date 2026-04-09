import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
        email:{
        type:String,
        required:true,
        unique:true
        },
        phone:{
        type:Number,
        required:true
        },
        password:{
        type:String,
        required:true
        },
        profilePicture:{
        type:String
        
       },
       bio:{
        type:String
       },
       followers:[{
         follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
         }
         }],
         following:[{
            followed:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'User'
            }

         }]
      },
 {timestamps: true})

const User = mongoose.model("User", UserSchema);

export default User;