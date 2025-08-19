import { Post } from "./Post.model.js";
import { UserModel } from "./USER.model.js";
import {Comment} from "./Comment.model.js";

UserModel.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(UserModel, { foreignKey: "userId" });

UserModel.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(UserModel, { foreignKey: "userId" });

Post.hasMany(Comment, { foreignKey: "postId" });
