const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./db');
const models = require('./db/models/models');
const cors = require('cors');
const router = require('./routes/index');

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

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
