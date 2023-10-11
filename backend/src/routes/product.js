const fs = require('fs');
const express = require('express');
const path = require('path');
const router = express.Router();

function addProductToFile(productName, productOwnerName, developers, scrumMasterName, startDate, methodology, location) {
    // Read the existing data from the JSON file
    const filePath = path.join(__dirname, '../mock_data/products.json');
    const rawData = fs.readFileSync(filePath);
    const data = JSON.parse(rawData);

    // Find the highest existing productId
    let highestProductId = 0;
    for (const product of data) {
        if (product.productId > highestProductId) {
            highestProductId = product.productId;
        }
    }

    // Increment the highest productId by one to create a new productId
    const newProductId = highestProductId + 1;

    // Create a new product object with the provided values
    const newProduct = {
        productId: newProductId,
        productName,
        productOwnerName,
        developers,
        scrumMasterName,
        startDate,
        methodology,
        location,
    };

    // Add the new product to the existing data
    data.push(newProduct);

    // Write the updated data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return data;
}

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:   # Change content type to JSON
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: The name of the product.
 *               productOwnerName:
 *                 type: string
 *                 description: The name of the product owner.
 *               developers:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of developer names.
 *               scrumMasterName:
 *                 type: string
 *                 description: The name of the Scrum Master.
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: The start date of the product.
 *               methodology:
 *                 type: string
 *                 description: The development methodology (e.g., Agile, Waterfall).
 *               location:
 *                 type: string
 *                 description: The location of the product.
 *     consumes:
 *       - application/json   # Update the content type to JSON
 *     responses:
 *       '201':
 *         description: Product created successfully.
 *       '400':
 *         description: Bad request, data validation failed.
 *       '500':
 *         description: Error adding the product to the database.
 */
router.post('/product', (req, res) => {
    // Verify that all required values are present in req.body
    const {
        productName,
        productOwnerName,
        developers,
        scrumMasterName,
        startDate,
        methodology,
        location
    } = req.body;

    if (
        !productName ||
        !productOwnerName ||
        !developers ||
        !scrumMasterName ||
        !startDate ||
        !methodology ||
        !location
    ) {
        // If any of the required values are missing, return a 400 bad request response
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Add the product to the database and wrap it in try/catch in case of errors
    try {
        addProductToFile(productName, productOwnerName, developers, scrumMasterName, startDate, methodology, location);
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ error: 'Error adding product to the database' });
    }

    res.status(201).json({ message: 'Product created successfully' });
});

module.exports = router;
