import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import db from '../services/db';

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


export default Tag;