import { Router } from "express";
import { createPost, deletePost, getPosts, getSinglePost, searchPost, updatePost } from "../controllers/posts.js";
import { checkSchema } from "express-validator";
import { postSchema } from "../validators/postSchema.js";
import { requiredAuth } from "../middlewares/authUser.js";


const postRouter = Router()

postRouter.post("/posts", requiredAuth, checkSchema(postSchema), createPost)
postRouter.get("/posts", getPosts)
postRouter.post("/posts/search", searchPost)
postRouter.get("/post/:id", getSinglePost)
postRouter.put("/posts/:id", requiredAuth, updatePost)
postRouter.delete("/post/:id", requiredAuth, deletePost)

export default postRouter