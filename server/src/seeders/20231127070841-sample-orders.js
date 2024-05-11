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
    await queryInterface.bulkInsert('Orders', [
      {
        accountId: 2,
        status: 'WAITING',
        totalPrice: 999,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        accountId: 2,
        status: 'WAITING',
        totalPrice: 998,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
