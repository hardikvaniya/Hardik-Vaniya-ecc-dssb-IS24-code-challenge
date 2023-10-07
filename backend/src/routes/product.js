const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     description: Retrieve a list of products from the database.
 *     responses:
 *       '200':
 *         description: A successful response with a list of products.
 */
router.get('/product/:id', (req, res) => {
    const productId = req.params.id; // Access the 'id' parameter from the URL
    // Your code to retrieve a single product by ID from the database
    res.json({ product: productId }); // Replace with actual data
});

module.exports = router;