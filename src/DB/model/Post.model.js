import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.db.js";
import { UserModel } from "./USER.model.js";
import { Comment } from "./Comment.model.js";



export class Post extends Model{ }
Post.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
        
    },
    content: {
        type: DataTypes.TEXT,
        allowNull:false
    }
    , userId: {
        type: DataTypes.INTEGER,
    allowNull: false,
    references: {
    model: 'Users', 
    key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
}  

    }

, {
    sequelize,
    paranoid: true,
        timestamps:true,

    deletedAt: 'destroyTime',
    })





