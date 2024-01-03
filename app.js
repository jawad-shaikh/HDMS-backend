const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.static('uploads'));
app.use(express.json({ limit: '100mb' }));
app.use(cors());

// require('./cron-jobs/index');

app.get('/', (req, res) => res.send('hello'));
app.use('/api/v1', require('./routes/index'));

module.exports = app;
