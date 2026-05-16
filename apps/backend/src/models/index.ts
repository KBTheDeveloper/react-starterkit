import sequelize from '../config/database.js';
import User from './User.js';
import File from './File.js';

const db = {
    sequelize,
    User,
    File
};

export default db;
