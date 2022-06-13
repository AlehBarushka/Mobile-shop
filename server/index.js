const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./db');

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server starts on ${PORT} port...`));

    await sequelize.authenticate();

    console.log('Database connected!');

    await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
};

start();
