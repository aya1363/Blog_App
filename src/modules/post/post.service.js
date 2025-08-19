import {Post} from '../../DB/model/Post.model.js'
import { UserModel } from '../../DB/model/USER.model.js'
import { errorHandling } from '../../utils/response.js'
import {Comment} from '../../DB/model/Comment.model.js'
export const newPost = async (req, res, next) => {
    try {
        const {title ,content,userId}= req.body
        const newPost = await Post.create({ title, content, userId })
        if (newPost) {
            res.status(201).json({message:'post successfully added',newPost})
        } 
    } catch (error) {
        errorHandling({res,error})
    }
}
export const softDelete = async (req, res, next) => {
    try {
        const { id } = req.params
        const { userId } = req.body
        const PostData = await Post.findByPk(id)
        if (!PostData) {
            return res.status(404).json({ message: "Post not found" });
    }
    if (PostData.userId !== userId) {
        return res.status(403).json({ message: "You are not allowed to delete this post" });
    }
        if (PostData.userId === userId) {
            await Post.destroy({ where: { id } });
            res.status(200).json({message:'post deleted'})
        }
    } catch (error) {
        errorHandling({res,error})
    }
}
export const allPosts = async (req, res, next) => {
    try {
        const usersWithPosts = await Post.findAll({
            attributes: ['id', 'title'],
            include: [
                {
                    model: UserModel,
                    attributes: ['id', 'userName'],
                }
            ]
        });
        res.status(200).json({ msg: 'get ALL posts', usersWithPosts });
    } catch (error) {
        errorHandling({ res, error });
    }
}
import { Sequelize } from 'sequelize';
// ...existing code...

export const commentCount = async (req, res, next) => {
    try {
        const postsWithCommentCount = await Post.findAll({
            attributes: [
                'id',
                'title',
                [Sequelize.fn('COUNT', Sequelize.col('Comments.id')), 'commentCount']
            ],
            include: [
                {
                    model: Comment,
                    attributes: []
                }
            ],
            group: ['Post.id']
        });
        res.status(200).json({ msg: 'Comment count per post', postsWithCommentCount });
    } catch (error) {
        errorHandling({ res, error });
    }
}