import express from "express";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import commentRouter from "./routes/comments.js";

dotenv.config();
const prisma = new PrismaClient();

const app = express();
// app.use((req, res, next) => {
//   // res.setHeader('Access-Control-Allow-Origin', '*');
//   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   // res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    },
  })
);
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter)

// app.post("/register", async (req, res) => {
//   const { username, email, password } = req.body;
//   const user = await prisma.users.create({
//     data: {
//       id: id,
//       username: username,
//       email: email,
//       password: password,
//     },
//   });
//   res.status(201).send(user);
// });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
