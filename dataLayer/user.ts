import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import db from '../services/db';

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id: CreationOptional<string>;
  username: string;
  email: string;
  password: string;
  salt: string;
  is_admin: CreationOptional<boolean>;
  registration_time: CreationOptional<Date>;
  last_login_time: CreationOptional<Date>;
}

const User = db.define<UserModel>('user', {
  id: {
    type: DataTypes.UUID,
    autoIncrement: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.TEXT,
  salt: DataTypes.STRING,
  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  registration_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  last_login_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
}, { timestamps: false });

export default User;
