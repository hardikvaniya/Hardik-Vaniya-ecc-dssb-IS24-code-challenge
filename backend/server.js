const express = require('express');
const cors = require('cors'); // Import the 'cors' middleware
const app = express();
const usersRoute = require('./src/routes/products');

const port = process.env.PORT || 5000;
const setupSwagger = require('./src/swagger/swagger.js'); // Replace with the correct path

// ... Other middleware and routes ...
app.use(cors());
app.use('/api', usersRoute);

// Initialize Swagger documentation
setupSwagger(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});