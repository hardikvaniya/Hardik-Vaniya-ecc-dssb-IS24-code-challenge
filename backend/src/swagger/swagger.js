const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your web application',
    },
  },
  apis: ['./src/routes/*.js'], // Replace with the path to your API route files
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', require('swagger-ui-express').serve, require('swagger-ui-express').setup(specs));
};
