const express = require('express');
const cors = require('cors'); // Import the 'cors' middleware
const app = express();
const healthRoute = require('./src/routes/health');
const productsRoute = require('./src/routes/products');
const productRoute = require('./src/routes/product');

const port = process.env.PORT || 5000;
const setupSwagger = require('./src/swagger/swagger.js'); // Replace with the correct path

// ... Other middleware and routes ...
app.use(express.json());
app.use(cors());

app.use('/api', healthRoute);
app.use('/api', productsRoute);
app.use('/api', productRoute);

// Initialize Swagger documentation
setupSwagger(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});