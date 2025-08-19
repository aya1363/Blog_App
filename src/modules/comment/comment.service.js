import { Op } from "sequelize";
import { Comment } from "../../DB/model/Comment.model.js";
import { errorHandling } from "../../utils/response.js";
import { UserModel } from "../../DB/model/USER.model.js";
import { Post } from "../../DB/model/Post.model.js";


export const createComment = async (req, res) => {
  try {
    const { postId, content, userId } = req.body;

    const addComment = await Comment.create({ postId, content, userId });

    res.status(201).json({
      message: "Comment successfully added",
      addComment,
    });
  } catch (error) {
    errorHandling({ res, error });
  }
};


export const updateComment = async (req, res) => {
    try {
    const { postId, content, userId } = req.body;
    const { commentId } = req.params;

    let existingComment = await Comment.findByPk(commentId);

    if (!existingComment) {
        return res.status(404).json({ message: "Comment not found" });
    }

    if (existingComment.userId !== userId) {
        return res
        .status(403)
        .json({ message: "You cannot update this comment" });
    }

    await Comment.update(
        { postId, content },
        { where: { id: commentId } }
    );

    const updatedComment = await Comment.findByPk(commentId);

    res.status(200).json({
        message: "Comment successfully updated",
        updatedComment,
    });
} catch (error) {
    errorHandling({ res, error });
}
};

export const findOrCreateComment = async (req, res) => {
    try {
    const { postId, content, userId } = req.body;

    const [comment, created] = await Comment.findOrCreate({
        where: { postId, content, userId },
        defaults: { postId, content, userId },
    });

    res.status(200).json({
        message: created ? "Comment created" : "Comment already exists",
        comment,
    });
} catch (error) {
    errorHandling({ res, error });
}
};

export const searchComment = async (req, res) => {
    try {
    const { q } = req.query;

    const results = await Comment.findAll({
        where: {
        content: {
            [Op.like]: `%${q}%`,
        },
    },
        include: [
        { model: UserModel, attributes: ["id", "userName", "email"] },
        { model: Post, attributes: ["id", "title"] },
    ],
    });

    res.status(200).json({
        message: "Search results",
        count: results.length,
        results,
    });
} catch (error) {
    errorHandling({ res, error });
}
};


export const newestComment = async (req, res) => {
    try {
    const { postId } = req.params;

    const comments = await Comment.findAll({
        where: { postId },
        order: [["createdAt", "DESC"]],
        limit: 5,
        include: [
        { model: UserModel, attributes: ["id", "userName"] },
    ],
    });

    res.status(200).json({
        message: "Newest comments",
        comments,
    });
    } catch (error) {
    errorHandling({ res, error });
}
};


export const commentByPk = async (req, res) => {
    try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id, {
        include: [
        { model: UserModel, attributes: ["id", "userName", "email"] },
        { model: Post, attributes: ["id", "title"] },
    ],
    });

    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({
        message: "Comment details",
        comment,
    });
    } catch (error) {
    errorHandling({ res, error });
}
};
