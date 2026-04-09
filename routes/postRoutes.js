import express from "express";
import { createPost,getAllPost,getuserPost } from "../controller/PostController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/upload.js";

const postRouter = express.Router();


postRouter.post("/create",authUser,upload.array("media"),createPost)
postRouter.get("/allPost",getAllPost)
postRouter.get("/user/:userId",authUser,getuserPost)


export default postRouter;