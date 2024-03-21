const { sequelize } = require('../config/connectDatabase')
const { Product } = require('../models/product');

class ProductController {
    showAllProducts = async (req, res) => {
        try {
            await sequelize.authenticate();
            await sequelize.sync();
            const products = await sequelize.findAll();
            res.json(products);
        } catch (err) {
            console.log("Cannot get products from database ", err);
        }
    }
}

module.exports = new ProductController();
