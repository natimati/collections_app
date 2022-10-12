import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import db from '../services/db';

interface ItemsModel extends Model<InferAttributes<ItemsModel>, InferCreationAttributes<ItemsModel>> {
  id: CreationOptional<number>;
  collection_id: CreationOptional<string>;
  author_id: CreationOptional<string>;
  name: string;
  image_url: CreationOptional<string>;
  created_at: CreationOptional<Date>;
  updated: CreationOptional<Date>;
}

const Item = db.define<ItemsModel>('Item', {
  id: {
    type: DataTypes.UUID,
    autoIncrement: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  collection_id: DataTypes.STRING,
  author_id: DataTypes.STRING,
  name: DataTypes.STRING,
  image_url: DataTypes.STRING,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
}, { timestamps: false });

export default Item;