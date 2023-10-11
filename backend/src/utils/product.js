const fs = require('fs');
const path = require('path');

function readProductsFromFile() {
    const filePath = path.join(__dirname, '../mock_data/products.json');
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
}

function writeProductsToFile(data) {
    const filePath = path.join(__dirname, '../mock_data/products.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function addProductToFile(productName, productOwnerName, developers, scrumMasterName, startDate, methodology, location) {
    const data = readProductsFromFile();

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
    writeProductsToFile(data);

    return data;
}

module.exports = {
    addProductToFile
};