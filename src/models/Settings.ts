import { DataTypes, Model } from 'sequelize';
import sequelize from '../util/database';

export default class Settings extends Model {
    guild_id?: string;
    prefix?: string;
    code_channel?: string;
}
Settings.init({
    guild_id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
    },
    prefix: {
        type: DataTypes.STRING,
        defaultValue: '/',
    },
    code_channel: {
        type: DataTypes.STRING(20),
    }
}, {
    sequelize,
    tableName: 'settings'
});