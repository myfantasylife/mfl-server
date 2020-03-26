const express = require('express');
const router = express.Router();
const config = require('../config');
const db = require('../db');
const collectionName = 'posts';
const ObjectId = require('mongodb').ObjectId

db.initialize(config.db_name, collectionName, (dbCollection) => {
  // Create
  router.post('/', (request, response) => {
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
  router.get('/:id', (request, response) => {
    const postId = new ObjectId(request.params.id);
    dbCollection.findOne({ _id: postId }, (err, result) => {
      if (err) throw err;
      response.json(result);
    });
  });

  // Read all
  router.get('/', (request, response) => {
    dbCollection.find().toArray((err, result) => {
      if (err) throw err;
      response.json(result);
    });
  });

  // Update
  router.put('/:id', (request, response) => {
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
  router.delete('/:id', (request, response) => {
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

});

module.exports = router;