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

// DB
const db = require('./db');
const dbName = 'mfl_db';
const collectionName = 'posts';
const ObjectId = require('mongodb').ObjectId

db.initialize(dbName, collectionName, (dbCollection) => {
    // Fetching all items
    dbCollection.find().toArray((err, res) => {
        if (err) throw err;
        console.log('Result:', res);
    })

    // Create
    app.post('/posts', (request, response) => {
        const post = request.body;
        dbCollection.insertOne(post, (err, result) => {
            if (err) throw err;
            dbCollection.find().toArray((_err, _result) => {
                if (_err) throw _err;
                response.json(_result);
            });
        });
    });

    // Read one
    app.get('/posts/:id', (request, response) => {
        const postId = new ObjectId(request.params.id);
        dbCollection.findOne({ _id: postId }, (err, result) => {
            if (err) throw err;
            response.json(result);
        });
    });

    // Read all
    app.get('/posts', (request, response) => {
        dbCollection.find().toArray((err, result) => {
            if (err) throw err;
            response.json(result);
        });
    });

    // Update
    app.put('/posts/:id', (request, response) => {
        const postId = new ObjectId(request.params.id);
        const post = request.body;
        console.log(`Editing post: ${postId} to be ${post}`);

        dbCollection.updateOne({ _id: postId }, { $set: post }, (err, result) => {
            if (err) throw err;
            dbCollection.find().toArray((_err, _result) => {
                if (_err) throw _err;
                response.json(_result);
            });
        });
    });

    // Delete
    app.delete('/posts/:id', (request, response) => {
        const postId = new ObjectId(request.params.id);
        console.log(`Delete post with id: ${postId}`);

        dbCollection.deleteOne({ _id: postId }, (err, result) => {
            if (err) throw err;
            dbCollection.find().toArray((_err, _result) => {
                if (_err) throw _err;
                response.json(_result);
            });
        });
    });

}, err => {
    throw (err);
});


app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));