import  mongoose from "mongoose";



const postSchema = new mongoose.Schema(
  {
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    },

    caption: {
      type: String,
      required: true
    },
  media: [
  {
    mediaType: {
      type: String
    },
    mediaUrl: {
      type: String
    }
  }
],
   
    likes:[{
      likedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      }
    }],
    likesCount:{
      type:Number,
      default:0
    },
   commentsCount:{
    type:Number,
    default:0
   },
   location:{
    type:String
   }

  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;