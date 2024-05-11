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
    await queryInterface.bulkInsert('Product_In_Orders', [
      {
        orderId: 1,
        productId: 2,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 18,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        productId: 28,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        productId: 78,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 37,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 97,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('Product_In_Orders', null, {});
  },
};
