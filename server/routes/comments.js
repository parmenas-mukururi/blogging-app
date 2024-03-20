import { Router } from "express"
import { checkSchema } from "express-validator"
import { commentSchema } from "../validators/commentSchema.js"
import { getComments, writeComment } from "../controllers/comments.js"

const commentRouter = Router()

commentRouter.post("/comments", checkSchema(commentSchema), writeComment)
commentRouter.get("/comments", getComments)

export default commentRouter