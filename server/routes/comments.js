import { Router } from "express";
import { checkSchema } from "express-validator";
import { commentSchema } from "../validators/commentSchema.js";
import { getComments, writeComment } from "../controllers/comments.js";
import { requiredAuth } from "../middlewares/authUser.js";

const commentRouter = Router();

commentRouter.post("/comments", requiredAuth, checkSchema(commentSchema), writeComment);
commentRouter.get("/comments/:id", getComments);

export default commentRouter;
