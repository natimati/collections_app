import { Model, DataTypes, NonAttribute, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import db from '../services/db';
import { AdditionalFieldModel } from './additionalField';
import User from './user';

interface CollectionModel extends Model<InferAttributes<CollectionModel>, InferCreationAttributes<CollectionModel>> {
  id: CreationOptional<string>;
  author_id: string;
  name: string;
  topic: String;
  description: String;
  image_url: CreationOptional<string>;
  additional_fields?: AdditionalFieldModel[];
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

const Collection = db.define<CollectionModel>('collection', {
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
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
}, { timestamps: false });

User.hasMany(Collection, {
  foreignKey: 'author_id',
  sourceKey: 'id',
  as: 'collections'
});

Collection.belongsTo(User, {
  foreignKey: 'author_id',
  targetKey: 'id',
  as: 'author'
});

export default Collection;