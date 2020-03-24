const Post = require('../models/post');

const fetchPosts = (req, res, next) => {
  Post.find().lean().exec((err, posts) => res.json({
    posts: posts.map(post => ({
      ...post
    }))
  }))
}

exports.fetchPosts = fetchPosts;