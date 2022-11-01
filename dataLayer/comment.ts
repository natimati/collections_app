import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import db from '../services/db';
import Item from './item';
import User from './user';

interface CommentsModel extends Model<InferAttributes<CommentsModel>, InferCreationAttributes<CommentsModel>> {
    id: CreationOptional<string>;
    item_id: CreationOptional<string>;
    author_id: CreationOptional<string>;
    body: string;
    created_at: CreationOptional<Date>;
}

const Comment = db.define<CommentsModel>('comment', {
    id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    item_id: DataTypes.UUID,
    author_id: DataTypes.UUID,
    body: DataTypes.TEXT,
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, { timestamps: false });

Item.hasMany(Comment, {
    foreignKey: 'item_id',
    sourceKey: 'id',
    as: 'comments',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Item, {
    foreignKey: 'item_id',
    targetKey: 'id',
    as: 'item'
});

User.hasMany(Comment, {
    foreignKey: 'author_id',
    sourceKey: 'id',
    as: 'comments',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'author_id',
    targetKey: 'id',
    as: 'author'
});

export default Comment;