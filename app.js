const DB_PASSWORD = require('./config')
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://mfl_admin:<${DB_PASSWORD}>@myfantasylife-dev-bghip.gcp.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connect to MongoDB success !'))
  .catch(() => console.log('Connect to MongoDB failed !'));