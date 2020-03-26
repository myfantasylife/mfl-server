const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const DB_URL = `mongodb+srv://${config.mongodb_user}:${config.mongodb_pass}@myfantasylife-dev-bghip.gcp.mongodb.net/test?retryWrites=true&w=majority`

function initialize(
  dbName,
  dbCollectionName,
  successCallback,
  failureCallback
) {
  MongoClient.connect(DB_URL, (err, dbInstance) => {
    if (err) {
      console.log(`[MongoDB connection] ERROR: ${err}`);
      failureCallback(err);
    } else {
      const dbObject = dbInstance.db(dbName);
      const dbCollection = dbObject.collection(dbCollectionName);
      console.log('[MongoDB connection] SUCCESS');

      successCallback(dbCollection);
    }
  })
}

module.exports = {
  initialize
};