import { Sequelize } from 'sequelize';

const db = new Sequelize(process.env.DATABASE_URL as string, { dialect: 'mysql' })

export default db;