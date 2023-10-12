const express = require('express');
const productsUtil = require('../utils/products.js'); 
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Search API
 */

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search for products
 *     description: Search for products based on the provided criteria. If no criteria are provided, all products are returned.
 *     tags: [Search]  # Assign the endpoint to the "Products" tag
 *     parameters:
 *       - in: query
 *         name: scrum_master
 *         schema:
 *           type: string
 *         description: Scrum Master name to search for.
 *       - in: query
 *         name: developer
 *         schema:
 *           type: string
 *         description: Developer name to search for.
 *     responses:
 *       '200':
 *         description: A successful response with a list of matching products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   description: List of matching products.
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: integer
 *                         description: Product ID.
 *                       productName:
 *                         type: string
 *                         description: Product name.
 *                       productOwnerName:
 *                         type: string
 *                         description: Product Owner's name.
 *                       developers:
 *                         type: array
 *                         description: List of developers' names.
 *                         items:
 *                           type: string
 *                       scrumMasterName:
 *                         type: string
 *                         description: Scrum Master's name.
 *                       startDate:
 *                         type: string
 *                         description: Start date (e.g., "2023/10/15").
 *                       methodology:
 *                         type: string
 *                         description: Methodology (e.g., "Agile").
 *                       location:
 *                         type: string
 *                         description: Location.
 *       '400':
 *         description: Bad request if no query parameters are provided.
 *       '404':
 *         description: Not found if no matching products are found.
 */
router.get('/products/search', (req, res) => {
    const { scrum_master, developer } = req.query;

    let allProducts = [];
    try {
        // Read product data from the database or any other source
        allProducts = productsUtil.getAllProducts();
    } catch (error){
        return res.status(500).json({error: 'Error reading products from the database.' })
    }

    // Function to check if a string contains another string (case-insensitive)
    const contains = (str, searchStr) => str.toLowerCase().includes(searchStr.toLowerCase());

    // Filter products based on query parameters
    const filteredProducts = allProducts.filter((product) => {
        if (scrum_master && developer) {
            // If both parameters are provided, filter based on both
            return contains(product.scrumMasterName, scrum_master) && product.developers.some((dev) => contains(dev, developer));
        } else if (scrum_master) {
            // If only scrum_master is provided, filter based on scrum_master
            return contains(product.scrumMasterName, scrum_master);
        } else if (developer) {
            // If only developer is provided, filter based on developer
            return product.developers.some((dev) => contains(dev, developer));
        }

        // If both parameters are empty, include the product in the result
        return true;
    });

    return res.status(200).json({ products: filteredProducts });
});

module.exports = router;