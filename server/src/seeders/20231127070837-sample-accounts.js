'use strict';
const bcrypt = require('bcryptjs');
const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Accounts', [
      {
        accountName: 'Nguyễn Cao Đức',
        accountPhone: '0362124865',
        accountPassword: hashPassword('123456'),
        accountType: 'ADMIN',
        accountAddress: 'BN',
        accountEmail: 'iamduc3024@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        accountName: 'Đặng Tiến Dũng',
        accountPhone: '0329579903',
        accountPassword: hashPassword('123456'),
        accountType: 'ADMIN',
        accountAddress: 'HN',
        accountEmail: 'dungpgpma2k3@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        accountName: 'Lê Minh Đạt',
        accountPhone: '0393516203',
        accountPassword: hashPassword('123456'),
        accountType: 'ADMIN',
        accountAddress: 'TN',
        accountEmail: 'minhdatuet@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        accountName: 'Nguyễn Cao Đức',
        accountPhone: '0000000001',
        accountPassword: hashPassword('123456'),
        accountType: 'CUSTOMER',
        accountAddress: 'BN',
        accountEmail: 'test1@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        accountName: 'Đặng Tiến Dũng',
        accountPhone: '0000000002',
        accountPassword: hashPassword('123456'),
        accountType: 'CUSTOMER',
        accountAddress: 'HN',
        accountEmail: 'test2@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        accountName: 'Lê Minh Đạt',
        accountPhone: '0000000003',
        accountPassword: hashPassword('123456'),
        accountType: 'CUSTOMER',
        accountAddress: 'TN',
        accountEmail: 'test3@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        accountName: 'Lê Minh Đạt',
        accountPhone: '0000000004',
        accountPassword: hashPassword('123456'),
        accountType: 'CUSTOMER',
        accountAddress: 'TN',
        accountEmail: 'test4@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        accountName: 'Đặng Tiến Dũng',
        accountPhone: '0000000005',
        accountPassword: hashPassword('123456'),
        accountType: 'CUSTOMER',
        accountAddress: 'HN',
        accountEmail: 'test5@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        accountName: 'Nguyễn Cao Đức',
        accountPhone: '0000000006',
        accountPassword: hashPassword('123456'),
        accountType: 'CUSTOMER',
        accountAddress: 'BN',
        accountEmail: 'test6@gmail.com',
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
