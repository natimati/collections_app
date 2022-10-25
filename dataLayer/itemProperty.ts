import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import db from '../services/db';
import Item from './item';
import AdditionalField from './additionalField';

interface ItemPropertyModel extends Model<InferAttributes<ItemPropertyModel>, InferCreationAttributes<ItemPropertyModel>> {
    id: CreationOptional<string>;
    additional_field_id: string;
    collection_id: string;
    item_id: string;
    value: string;
    created_at: CreationOptional<Date>;
    updated_at: CreationOptional<Date>;
}

const ItemProperty = db.define<ItemPropertyModel>('item_property', {
    id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    additional_field_id: DataTypes.UUID,
    collection_id: DataTypes.UUID,
    item_id: DataTypes.UUID,
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    value: DataTypes.STRING,
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, { timestamps: false });

ItemProperty.belongsTo(Item, {
    foreignKey: 'item_id',
    targetKey: 'id',
    as: 'item'
});

Item.hasMany(ItemProperty, {
    foreignKey: 'item_id',
    sourceKey: 'id',
    as: 'item_properties'
});

AdditionalField.hasMany(ItemProperty, {
    foreignKey: 'additional_field_id',
    sourceKey: 'id',
    as: 'item_properties'
});

ItemProperty.belongsTo(AdditionalField, {
    foreignKey: 'additional_field_id',
    targetKey: 'id',
    as: 'additional_field'
});

export default ItemProperty;