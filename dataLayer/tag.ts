import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import db from '../services/db';
import Item from './item';

interface TagsModel extends Model<InferAttributes<TagsModel>, InferCreationAttributes<TagsModel>> {
    id: CreationOptional<string>;
    name: String;
}

const Tag = db.define<TagsModel>('tag', {
    id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
}, { timestamps: false });

Item.belongsToMany(Tag, { through: 'item_tag_relationship' });
Tag.belongsToMany(Item, { through: 'item_tag_relationship' });

export default Tag;