import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

dotenv.config();

const createUser = async (req, res) => {
  console.log(req.body);
  try {
    //check if user already exists
    const ifExists = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!ifExists) {
      const { username, email, password } = req.body;
      //hash the password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const newUser = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hash,
        },
      });
      res.status(201).send(newUser);
    } else {
      res.status(400).send("User already exists");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  console.log(req.body)
  try {
    //check if user exists
    const userExists = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    console.log('User Exists: ', userExists)
    if (userExists) {
      //compare password with the hashed password
      const comparePassword = await bcrypt.compare(req.body.password, userExists.password);
      if (!comparePassword) {
        return res.status(400).send("Wrong username or password");
      }
      //create token with user's ID
      const token = jwt.sign({ userId: userExists.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      // store the token in a cookie with secure and httpOnly options
      res.cookie("access_token", token, { httpOnly: true });
      
      // store the user session
      req.session.user = userExists;
      // return the token/successful login
      res.status(200).send(userExists)
    } else {
      res.status(400).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

const logout =  async (req, res) => {
  try {
    // clear the access_token cookie
    res.clearCookie("access_token");
    res.status(200).send("Logged out");
  } catch (error) {
    res.status(400).send(error.message);
  }
}
export { createUser, login, logout};
