import Sequelize from 'sequelize';

const sequelize = new Sequelize('slack', 'postgres', 'postgres');

const models = {
    user: sequelize.import('./users'),
    channel: sequelize.import('./channel'),
    member: sequelize.import('./member'),
    message: sequelize.import('./message'),
    team: sequelize.import('./team'),
};

Objects.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;