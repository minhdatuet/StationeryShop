'use strict';
const bcrypt = require('bcryptjs');
const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Accounts', [
      {
        // Sample data for the first record
        accountName: 'Nguyễn Cao Đức',
        accountPhone: '0000000001',
        accountPassword: hashPassword('123456'),
        accountType: 'CUSTOMER',
        accountAddress: 'BN',
        accountEmail: 'iamduc3024@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // Sample data for the first record
        accountName: 'Đặng Tiến Dũng',
        accountPhone: '0000000002',
        accountPassword: hashPassword('123456'),
        accountType: 'CUSTOMER',
        accountAddress: 'HN',
        accountEmail: 'dungpgpma2k3@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // Sample data for the first record
        accountName: 'Lê Minh Đạt',
        accountPhone: '0000000003',
        accountPassword: hashPassword('123456'),
        accountType: 'CUSTOMER',
        accountAddress: 'TN',
        accountEmail: 'minhdatuet@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('Accounts', null, {});
  },
};
