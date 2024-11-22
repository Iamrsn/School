const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./models/db');
const schoolRoutes = require('./routes/schoolRoutes');

require('dotenv').config();

// Connect to the database
connectDB();

const app = express();
app.use(bodyParser.json());

// API Routes
app.use('/api/v1', schoolRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
