import Sequelize from 'sequelize';

const sequelize = new Sequelize('slack', 'postgres', 'postgres');

const models = {
    User: sequelize.import('./users'),
    Channel: sequelize.import('./channel'),
    Message: sequelize.import('./message'),
    Team: sequelize.import('./team'),
};

Objects.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;