const { readProductsFromFile, writeProductsToFile} = require('./products.js'); 

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

function updateProductInFile(productId, updatedFields) {
    const data = readProductsFromFile();

    // Find the product by productId
    const productIndex = data.findIndex((product) => product.productId === productId);

    if (productIndex === -1) {
        // If the product doesn't exist, return a 404 response
        return null;
    }

    // Merge the updated fields with the existing product data
    data[productIndex] = {
        ...data[productIndex],
        ...updatedFields
    };

    // Write the updated data back to the JSON file
    writeProductsToFile(data);

    return data[productIndex];
}

module.exports = {
    addProductToFile,
    updateProductInFile,
};
