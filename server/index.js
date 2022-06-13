const express = require('express');

const PORT = 5000;

const app = express();

app.listen(PORT, () => console.log(`Server starts on ${PORT} port...`));
