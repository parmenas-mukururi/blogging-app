import { PrismaClient } from "@prisma/client";
import { matchedData, validationResult } from "express-validator";
const prisma = new PrismaClient();

const createPost = async (req, res) => {
  console.log(req.body);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ status: "fail", errors }).end();
    }
    const data = matchedData(req);
    console.log('DEcoded ', req.decoded, data)

    const newPost = await prisma.post.create({
      data: {
        ...data,
        author: {
            connect: {
                id: req.decoded.userId
            }
        }
      },
      //  {
      //     title: req.body.title,
      //     content: req.body.content,
      //     category : req.body.category
      // }
    });
    console.log(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating post");
  }
};

const searchPost = async (req, res) => {
    try {
        const searchedPosts = await prisma.post.findMany({
            where: {
                title: {
                    contains: req.body.title
                }
            }
        })
        res.status(200).json(searchedPosts);
    } catch (error) {
        console.log(error.message)
    }
}
const getPosts = async (req, res) => {
  try {
    const category = req.query.cat;
    if (category) {
      const posts = await prisma.post.findMany({
        where: {
          category: category
        },
      });
      res.status(200).json(posts);
    } else {
      const posts = await prisma.post.findMany();
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Error getting posts" });
  }
};


const getSinglePost = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        author: true,
      }
    });
    console.log(post)
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Error getting posts" });
  }
};

const updatePost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ status: "fail", errors }).end();
    }
    const data = matchedData(req);
    const updatedPost = await prisma.post.update({
      where: {
        id: req.params.id,
      },
      data: data,
    });
    res.status(200).json(updatedPost).end();
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Error getting posts" });
  }
};
const deletePost = async (req, res) => {
  try {
    await prisma.post.delete({
      where: {
        id: req.params.id,
      },
    });
    res
      .status(200)
      .json({
        status: "success",
        message: "Post deleted successfully",
      })
      .end();
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error deleting post",
    });
  }
};

export {
  createPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
  searchPost
};
