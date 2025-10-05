require('dotenv').config(); 
require('express-async-errors'); 
const express = require('express');
const app = express();
const logger = require('./logger');
const { connectDB } = require('./db');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
console.log('MONGO_URI =', process.env.MONGO_URI);

app.use(express.json());
app.use('/api', routes);

app.get('/', (req, res) => res.send('Photo storage API is running'));

app.use(errorHandler);

async function start() {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    logger.error('Failed to start server', { message: err.message, stack: err.stack });
    process.exit(1);
  }
}

start();
