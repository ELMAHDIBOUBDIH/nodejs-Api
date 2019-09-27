const Sequelize = require('sequelize');


var sequelize = new Sequelize('ionic_auth', 'root', null,
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        charset: 'utf8'
    });
  sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));
module.exports = sequelize;

