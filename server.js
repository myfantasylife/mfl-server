const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

// CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const SERVER_PORT = 8080;

// Routes
const postsRouter = require('./controllers/postController');
const newsRouter = require('./controllers/newsController');

app.use('/posts', postsRouter);
app.use('/news', newsRouter);

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));