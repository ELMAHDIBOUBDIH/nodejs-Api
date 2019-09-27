'use strict';
var models = require('../models');

module.exports = {
    up: async (queryInterface, Sequelize) => {

        let user = await models.User.findAll({limit: 1, order: [['id', 'DESC']]})
        let role = await models.Role.findAll({limit: 1, order: [['id', 'DESC']]})
        return queryInterface.bulkInsert('UserRoles', [{
            idUser: user[0].id,
            idRole: role[0].id,
        }], {});
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

function getidUser() {
    models.User.findAll({limit: 1, order: [['id', 'DESC']]}).then((result) => {
        return result[0].id
    })
}

