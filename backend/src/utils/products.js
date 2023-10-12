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

function isValidURL(url) {
  // Regular expression pattern for a simple URL validation
  const urlPattern = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/;
  return urlPattern.test(url);
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

  return newProduct;
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

function deleteProductFromFile(productId) {
  const data = readProductsFromFile();

  // Find the index of the product by productId
  const productIndex = data.findIndex((product) => product.productId === productId);

  if (productIndex === -1) {
    // If the product doesn't exist, return null to indicate it was not found
    return null;
  }

  // Remove the product from the array
  data.splice(productIndex, 1);

  // Write the updated data back to the JSON file
  writeProductsToFile(data);

  // Return the deleted product (optional)
  return data[productIndex];
}


module.exports = {
    isValidURL,
    getAllProducts,
    readProductsFromFile,
    writeProductsToFile,
    addProductToFile,
    updateProductInFile,
    deleteProductFromFile
};