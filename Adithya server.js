const express = require('express');
const mongoose = require('mongoose');
const app = express();
// Middleware to parse JSON
app.use(express.json());
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pzt_db', { useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));
// Basic route
app.get('/', (req, res) => {
res.send('Welcome to the PZT Tile API');
});
// Import the auth routes (for user registration and login)
const auth = require('./routes/auth'); // Assuming auth.js is in the routes folder
// Use the auth routes for any requests starting with '/users'
app.use('/users', auth);
const tiles = require('./routes/tiles');
app.use('/pzt', tiles);
const roi = require('./routes/roi');
app.use('/pzt', roi);
const footTraffic = require('./routes/footTraffic');
app.use('/pzt', footTraffic);
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
definition: {
openapi: '3.0.0',
info: {
title: 'PZT Tile API',
version: '1.0.0',
description: 'API for PZT Tile selection and energy calculation',
},
},
apis: ['./routes/*.js'], // Path to the API docs
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
