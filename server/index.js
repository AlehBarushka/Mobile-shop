const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./db');
const fileUpload = require('express-fileupload');
const models = require('./db/models/models');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');
const { resolve } = require('path');

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

//Обработка ошибок, вызывается в конце!!!
app.use(errorHandler);

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
