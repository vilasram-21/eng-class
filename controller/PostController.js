import Post from "../models/PostSchema.js";
import Comment from "../models/Comments.js";



export const createPost = async (req, res) => {
  try {
    const { caption, location } = req.body;

    // map uploaded files
    const media = req.files.map(file => ({
      mediaType: file.mimetype.startsWith("image") ? "image" : "video",
      mediaUrl: `${req.protocol}://${req.get("host")}/uploads/${file.filename}` // for Windows file paths
    }));

    // get userId from authUser middleware
    const userId = req.user.id;

    const newPost = await Post.create({
      caption,
      location,
      media,
      userId
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllPost=async(req,res)=>{
    try {
        const posts=await Post.find().populate("userId", "name").sort({createdAt:-1})
        res.status(200).json({
            success:true,
            message:"Posts retrieved successfully",
            data:posts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error retrieving posts",
        
        })

    }
}
export const getuserPost=async(req,res)=>{
    try {
        const posts=await Post.find({userId:req.params.userId}).populate('userId','name').sort({createdAt:-1})
        res.status(200).json({
            success:true,
            message:"Posts retrieved successfully",
            data:posts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error retrieving posts",
           
        })
    }
}