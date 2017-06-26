var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var methodOverride = require('method-override');
var expressSanitizer = require('express-sanitizer');

mongoose.connect("mongodb://localhost/blog_app");

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

app.get('/', function(req, res) {
  res.redirect('/blogs');
});

app.get('/blogs', function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log(err); 
      res.redirect('/');
    } else {
      res.render('blogs', {blogs: blogs});
    }
  })
});

app.get('/blogs/blog-new', function(req, res) {
  res.render('blog-new');
});

app.post('/blogs', function(req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      console.log(err);
      res.redirect('/blogs/blog-new');
    } else {
      res.redirect('/blogs');
    }
  });
});

app.get('/blogs/:id', function(req, res) {
  console.log('getting blogs/id');
  console.log(req.params.id);
  Blog.findById(req.params.id, function(err, blog) {
    if (err) {
      console.log(err); 
      res.redirect('/blogs');
    } else {
      res.render('blog', {blog: blog});
    }
  });
});

app.get('/blogs/:id/edit', function(req, res) {
  Blog.findById(req.params.id, function(err, result) {
    if (err) {
      console.log(err); 
      res.redirect('/blogs');
    } else {
      console.log('yes it is getting and not an error');
      res.render('blog-edit', {blog: result});
    }
  });
});

app.put('/blogs/:id', function(req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, result) {
    if (err) {
      console.log(err); 
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs/' + req.params.id);
    }
  });
});

app.delete('/blogs/:id', function(req, res) {
  Blog.findByIdAndRemove(req.params.id, function(err, result) {
    if (err) {
      console.log(err); 
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs');
    }
  });
});

app.listen(3000, function() { console.log('up and runnon on localhost 3000') });
