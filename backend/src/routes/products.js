const express = require('express');
const productsUtil = require('./../utils/products.js'); 
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: APIs to manage products in bulk
 */


/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     description: Retrieve a list of products from the database.
 *     tags: [Products]  # Assign the endpoint to the "Products" tag
 *     responses:
 *       '200':
 *         description: A successful response with a list of products.
 */
router.get('/products', (req, res) => {
    const allProducts = productsUtil.getAllProducts();
    // Your code to retrieve products from the database
    res.json({ products: allProducts }); // Replace with actual data
});

module.exports = router;