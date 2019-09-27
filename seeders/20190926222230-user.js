'use strict';
const bcrypt = require('bcrypt');

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('Users', [
            {
                username: 'John Doe',
                email: 'admin@gmail.com',
                password: bcrypt.hashSync('123456', bcrypt.genSaltSync(10)) //123456

            },
            {
                username: 'boubdih elmahdi',
                email: 'boubdih@gmail.com',
                password: bcrypt.hashSync('123456', bcrypt.genSaltSync(10)) //123456

            }
        ], {});

    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
    }
};
