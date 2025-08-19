import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.db.js";
import { UserModel } from "./USER.model.js";
import { Post } from "./Post.model.js";

export class Comment extends Model {}
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Posts",
        key: "id",
      },
      onDelete: "CASCADE",
    },  userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User", // should match UserModel table name
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },

  {
    sequelize,
  }
);


