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

    await queryInterface.bulkInsert('Catalogs', [
      {
        catalogName: 'Backpack',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        catalogName: 'Book',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        catalogName: 'Casio',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        catalogName: 'Desk Lamp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        catalogName: 'Notebook',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        catalogName: 'Pen',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        catalogName: 'School Supplies',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        catalogName: 'Stationery Supplies',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        catalogName: 'Story Book',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        catalogName: 'Table and Chair',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);

    await queryInterface.bulkInsert('Products', [
      {
        productName: 'Baby Pink Rabbit Backpack',
        catalogId: 1,
        productCost: 100,
        productImage: 'https://drive.google.com/file/d/1ZpaNs6iQR7GoQ3p_LKDj0rzinsFIJ8yh/view?usp=drive_link',
        productQuantity: 100,
        productDescription: 'Test',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('Accounts', null, {});
    await queryInterface.bulkDelete('Catalogs', null, {});
  },
};
