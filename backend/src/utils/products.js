const fs = require('fs');
const path = require('path');

const JSON_FILE_PATH = path.join(__dirname, '../mock_data/products.json');

function readJsonFile(filePath) {
    try {
        const rawData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
}

function writeJsonFile(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing to JSON file:', error);
    }
}

function readProductsFromFile() {
    return readJsonFile(JSON_FILE_PATH) || [];
}

function writeProductsToFile(data) {
    writeJsonFile(JSON_FILE_PATH, data);
}

function getAllProducts() {
  // Define the path to the product.json file
  const productFilePath = path.join(__dirname, '..', 'mock_data', 'products.json');

  try {
    // Read and parse the JSON data
    const rawData = fs.readFileSync(productFilePath, 'utf-8');
    const productData = JSON.parse(rawData);

    return productData;
  } catch (error) {
    console.error('Error reading or parsing product data:', error);
    return null; // Return null or handle the error as needed
  }
}


module.exports = {
    getAllProducts,
    readProductsFromFile,
    writeProductsToFile
};