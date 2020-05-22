import {DataTypes} from 'sequelize';

export default (sequelize, DataTypes) => {
    const Channel = sequelize.define('channel', {
        name: DataTypes.STRING,
        public: DataTypes.BOOLEAN,
    },
    { underscored: true },
    );

    Channel.associate = (models) => {
        // 1:M
        Channel.belongsTo(models.Team, {
            foreignKey: {
                name: 'teamId',
                field: 'team_id',
            },
        });
        Channel.belongsToMany(models.User, {
            through: 'channel_member',
            foreignKey: {
                name: 'channeld',
                field: 'channel_id',
            },
        });
    };

    return Channel;
};