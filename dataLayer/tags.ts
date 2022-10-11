import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import db from '../services/db';

interface TagsModel extends Model<InferAttributes<TagsModel>, InferCreationAttributes<TagsModel>> {
    id: CreationOptional<number>;
    name: String;
}

const Tag = db.define<TagsModel>('Tag', {
    id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
});

export default Tag;