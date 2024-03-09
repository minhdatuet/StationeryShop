'use strict';

// Function to generate a random 9-digit phone number starting with 0 and with the second digit as '9', '8', or '1'
function generateRandomPhoneNumber() {
  const secondDigitOptions = ['9', '8', '1'];
  const secondDigit = secondDigitOptions[Math.floor(Math.random() * secondDigitOptions.length)];

  const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
  return '0' + secondDigit + String(randomNumber).substring(0, 8);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Accounts', [
      {
        // Sample data for the first record
        accountName: 'Huong',
        accountPhone: generateRandomPhoneNumber(),
        accountPassword: '$2a$12$1bswV8ED5ZV.WrmRY37kMeaghRHSdmhgnyuQZ/.ytoQUmf94LATAe',
        accountType: 'CUSTOMER',
        accountAddress: 'Ha Noi',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('Accounts', null, {});
  },
};
