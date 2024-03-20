import { PrismaClient } from "@prisma/client";
import { matchedData, validationResult } from "express-validator";
const prisma = new PrismaClient();

const getComments = () => {
  try {
    const comments = prisma.comment.findMany();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).send("Error fetching comments");
  }
};

// const getSingleComment = () => {
//   try {
//     const comment = prisma.comments.findUnique({
//       where: {
//         id: req.params.id,
//       },
//     });
//     res.status(200).json(comment);
//   } catch (error) {
//     res.status(500).send("Error fetching comment");
//   }
// };

const writeComment = async () => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ status: "fail", errors }).end();
    }
    const data = matchedData(req);
    const newComment = await prisma.comment.create({
      data: data,
      ...data,
      connect: {
        author: {
          user_id: req.decoded.userId,
        },
      },
      post: {
        connect: {
          post_id: req.decoded.postId,
        },
      },
    });
    res.status(201).send(newComment);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const editComment = async () => {};
const deleteComment = async () => {};

export { getComments, writeComment };
