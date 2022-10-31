import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import db from '../services/db';
import Collection from './collection';
import User from './user';

interface ItemsModel extends Model<InferAttributes<ItemsModel>, InferCreationAttributes<ItemsModel>> {
  id: CreationOptional<string>;
  collection_id: CreationOptional<string>;
  author_id: CreationOptional<string>;
  name: string;
  image_url: CreationOptional<string>;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

const Item = db.define<ItemsModel>('item', {
  id: {
    type: DataTypes.UUID,
    autoIncrement: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  collection_id: DataTypes.UUID,
  author_id: DataTypes.UUID,
  name: DataTypes.STRING,
  image_url: DataTypes.STRING,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
}, { timestamps: false });

Collection.hasMany(Item, {
  foreignKey: 'collection_id',
  sourceKey: 'id',
  as: 'items',
  onDelete: 'CASCADE'
});

Item.belongsTo(Collection, {
  foreignKey: 'collection_id',
  targetKey: 'id',
  as: 'collection'
});

User.hasMany(Item, {
  foreignKey: 'author_id',
  sourceKey: 'id',
  as: 'items',
  onDelete: 'CASCADE'
});

Item.belongsTo(User, {
  foreignKey: 'author_id',
  targetKey: 'id',
  as: 'author'
});

export default Item;