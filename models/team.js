import { Sequelize, DataTypes } from "sequelize/types";

export default (sequelize, DataTypes) => {
    const Team = sequelize.define('team', {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
    });

    Team.associate = (models) => {
        Team.belongsToMany(models.User, {
            through: 'member',
            foreignKey: 'userId',
        });
        Team.belongsToMany(models.User, {
            foreignKey: 'owner',
        })
    };

    return User;
};