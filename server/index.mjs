import express from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
import { v4 as uuidv4 } from "uuid";
const id = uuidv4();

const app = express();
app.use(express.json());


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
