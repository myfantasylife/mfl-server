const express = require('express');
const router = express.Router()
const config = require('../config');
const db = require('../db');
const collectionName = 'news';
const ObjectId = require('mongodb').ObjectId

db.initialize(config.db_name, collectionName, (dbCollection) => {
  // Create
  router.post('/', (request, response) => {
    const news = request.body;
    dbCollection.insertOne(news, (err, result) => {
      if (err) throw err;
      dbCollection.find().toArray((_err, _result) => {
        if (_err) throw _err;
        response.json(_result);
      });
    });
  });

  // Read one
  router.get('/:id', (request, response) => {
    const newsId = new ObjectId(request.params.id);
    dbCollection.findOne({ _id: newsId }, (err, result) => {
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
    const newsId = new ObjectId(request.params.id);
    const news = request.body;
    console.log(`Editing news: ${newsId} to be ${news}`);

    dbCollection.updateOne({ _id: newsId }, { $set: news }, (err, result) => {
      if (err) throw err;
      dbCollection.find().toArray((_err, _result) => {
        if (_err) throw _err;
        response.json(_result);
      });
    });
  });

  // Delete
  router.delete('/:id', (request, response) => {
    const newsId = new ObjectId(request.params.id);
    console.log(`Delete news with id: ${newsId}`);

    dbCollection.deleteOne({ _id: newsId }, (err, result) => {
      if (err) throw err;
      dbCollection.find().toArray((_err, _result) => {
        if (_err) throw _err;
        response.json(_result);
      });
    });
  });

});

module.exports = router;