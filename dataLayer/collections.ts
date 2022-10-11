import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import db from '../services/db';

interface CollectionModel extends Model<InferAttributes<CollectionModel>, InferCreationAttributes<CollectionModel>> {
  id: CreationOptional<number>;
  author_id: CreationOptional<string>;
  name: string;
  topic: String;
  description: String;
  image_url: CreationOptional<string>;
  created_at: CreationOptional<Date>;
  updated: CreationOptional<Date>;
  additional_fields: CreationOptional<JSON>
}

const Collection = db.define<CollectionModel>('Collection', {
  id: {
    type: DataTypes.UUID,
    autoIncrement: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  author_id: DataTypes.UUID,
  name: DataTypes.STRING,
  topic: DataTypes.STRING,
  description: DataTypes.TEXT,
  image_url: DataTypes.STRING,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  additional_fields: DataTypes.JSON
});

export default Collection;