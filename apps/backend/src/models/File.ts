import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.js';

interface FileAttributes {
    id: number;
    userId: number;
    originalName: string;
    key: string;        // S3 object key
    bucket: string;
    region: string;
    mimeType: string;
    size: number;
    url: string;        // public URL (S3 or CDN)
    createdAt?: Date;
    updatedAt?: Date;
}

interface FileCreationAttributes extends Optional<FileAttributes, 'id'> { }

class File extends Model<FileAttributes, FileCreationAttributes> implements FileAttributes {
    public id!: number;
    public userId!: number;
    public originalName!: string;
    public key!: string;
    public bucket!: string;
    public region!: string;
    public mimeType!: string;
    public size!: number;
    public url!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

File.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        originalName: { type: DataTypes.STRING, allowNull: false },
        key: { type: DataTypes.STRING, allowNull: false, unique: true },
        bucket: { type: DataTypes.STRING, allowNull: false },
        region: { type: DataTypes.STRING, allowNull: false },
        mimeType: { type: DataTypes.STRING, allowNull: false },
        size: { type: DataTypes.INTEGER, allowNull: false },
        url: { type: DataTypes.STRING, allowNull: false },
    },
    {
        sequelize,
        tableName: 'files',
    }
);

export default File;
