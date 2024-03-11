import express from "express";
import { v4 as uuidv4 } from "uuid";

const createUser = async (req, res) => {
  try {
    const id = uuidv4();
    //check if user already exists
    

    const { username, email, password } = req.body;
    const user = await prisma.users.create({
      data: {
        id: id,
        username: username,
        email: email,
        password: password,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export { createUser };
