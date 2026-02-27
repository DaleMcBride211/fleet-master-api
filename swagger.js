const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Fleet-Master-API',
    description: 'A comprehensive Fleet and Asset Management System designed to track vehicles, drones, and equipment. This API manages user authentication via OAuth, tracks detailed maintenance records, and monitors real-time deployment locations. Developed for the CSE341 Team Project.',
  },
  host: 'localhost:8080', // Remember to update this to your-service-name.onrender.com in production
  schemes: ['http', 'https'],
  tags: [
    { name: 'Users', description: 'Operations for user management and OAuth profiles' },
    { name: 'Assets', description: 'CRUD operations for vehicles, drones, and equipment' },
    { name: 'Maintenance', description: 'Tracking service history and repair logs' },
    { name: 'Locations', description: 'Managing deployment sites and storage hubs' }
  ],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate the documentation
swaggerAutogen(outputFile, endpointsFiles, doc);