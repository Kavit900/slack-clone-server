import {DataTypes} from 'sequelize';

export default (sequelize, DataTypes) => {
    const Team = sequelize.define('team', {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
    },
    { underscored: true },
    );

    Team.associate = (models) => {
        Team.belongsToMany(models.User, {
            through: 'member',
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            },
        });
        Team.belongsTo(models.User, {
            foreignKey: 'owner',
        })
    };

    return Team;
};