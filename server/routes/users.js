
import { Router } from "express";
import { createUser, login, logout } from "../controllers/user.js";
import { checkSchema } from "express-validator";
import { loginSchema, registerSchema } from "../validators/userSchema.js";
const userRouter = Router()


userRouter.post('/register',checkSchema(registerSchema), createUser)
userRouter.post("/login", checkSchema(loginSchema), login)
userRouter.post("/logout", logout)


export default userRouter