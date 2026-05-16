import bcrypt from "bcrypt"
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.js';


interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

    public async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
        hooks: {
            beforeCreate: async (user: User) => {
                const { password } = user.dataValues;

                if (password) {
                    user.dataValues.password = await bcrypt.hash(password, 10);
                }
            },
            beforeUpdate: async (user: User) => {
                const { password } = user.dataValues;

                if (user.changed('password')) {
                    user.dataValues.password = await bcrypt.hash(password, 10);
                }
            },
        },
    }
);

export default User;
