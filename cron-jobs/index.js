var cron = require('node-cron');
const checkForExpiredDocuments = require('./checkForExpiredDocuments');

cron.schedule('0 0 * * *', checkForExpiredDocuments);
// cron.schedule('* * * * *', checkForExpiredDocuments);
