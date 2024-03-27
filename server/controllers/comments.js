import { PrismaClient } from "@prisma/client";
import { matchedData, validationResult } from "express-validator";
const prisma = new PrismaClient();

const getComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        post_id: req.params.id,
      },
      include: {
        author: true,
      },
    });
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

const writeComment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "fail", errors: errors.array() });
    }

    const { content, post_id } = req.body;
    const { id } = req.params;
    console.log({post_id})
    const userId = req.decoded.userId;
console.log(content)
    const newComment = await prisma.comment.create({
      data: {
        content: content,
        author: {
          connect: {
            id: userId,
          },
        },
        post: {
          connect: {
            id: post_id,
          },
        },
      },
      include: {
        author: true,
      }
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error writing comment:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to write comment" });
  }
};

const editComment = async () => {};
const deleteComment = async () => {};

export { getComments, writeComment };
