const fs = require('fs');
const path = require('path');

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
    getAllProducts
};