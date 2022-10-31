import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import db from '../services/db';
import Collection from './collection';

export interface AdditionalFieldModel extends Model<InferAttributes<AdditionalFieldModel>, InferCreationAttributes<AdditionalFieldModel>> {
    id: CreationOptional<string>;
    name: string;
    type: string;
    collection_id: string;
    created_at: CreationOptional<Date>;
    updated_at: CreationOptional<Date>;
}

const AdditionalField = db.define<AdditionalFieldModel>('additional_field', {
    id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    collection_id: DataTypes.UUID,
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, { timestamps: false });


Collection.hasMany(AdditionalField, {
    foreignKey: 'collection_id',
    sourceKey: 'id',
    as: 'additional_fields',
    onDelete: 'CASCADE'
});

AdditionalField.belongsTo(Collection, {
    foreignKey: 'collection_id',
    targetKey: 'id',
    as: 'collection',
});

export default AdditionalField;