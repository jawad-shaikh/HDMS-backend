const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json({ limit: '100mb' }));
app.use(cors());

app.use('/api/v1', require('./routes/index'));

module.exports = app;
