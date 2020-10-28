import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../util/database';
import { Teams, Team } from '../util/Teams';

export default class User extends Model {
    code!: string;
    username!: string;
    team_name!: 'MYSTIC' | 'VALOR' | 'INSTINCT';
    user_id!: string;
    message_id?: string;
    createdAt?: Date;
    modifiedAt?: Date;


    public get team(): Team {
        return Teams[this.team_name]
    }

}

User.init({
    code: {
        type: DataTypes.STRING(12),
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    team_name: {
        type: DataTypes.ENUM('MYSTIC', 'VALOR', 'INSTINCT'),
        allowNull: false,
    },
    user_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    message_id: {
        type: DataTypes.STRING(20),
    }
}, {
    sequelize,
    tableName: 'users',
    indexes: [
        {
            unique: true,
            name: 'unique_username',
            fields: [Sequelize.fn('lower', Sequelize.col('username'))]
        }
    ]

});
