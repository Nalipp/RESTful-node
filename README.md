# Node RESTful api reference app

![screenshot](./public/Blog_App.jpg)

### mongoose
### semantic ui html framework
### body-parser 
<input type="text" name="blog[title]"> 
body-parser allows you acess a form object which can be created in a form using the following syntax

name="blog[title]"

this places each form element inside of an object and allows access all of the values simultaneously 

instead of accesing the title : req.body.title
we can access the blog object : req.body.blog.title 

the entire object is avaliable at req.body.blog
so it can easily be passed to the database through mongoose to with req.body.blog

example: 
Blog.create(req.body.blog)

### npm method-override
allows forms to accept PUT and DELETE methods with the following sintax
```
<form method="POST" action="/blogs/<%= blog._id %>?_method=PUT">
</form>
```
```
Blog.put('/blogs/:id', function(req, res) {
```

### npm express-sanitizer 
ejs allows you to read user submited html and script data in the browser
```
  <%- blog.body %>
```
block users from injecting scripts in the page 
by ignoring script tags with express-sanitizer 

## todo
add error handling 
add tests
