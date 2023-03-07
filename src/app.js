const express = require('express');
const login = require('./controllers/login');
const user = require('./controllers/user');
const category = require('./controllers/category');
const blogPost = require('./controllers/blogPost');
const middlewares = require('./middlewares/validationMiddlewares');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', login);

app.post('/user', middlewares.validateNewUser, user.createNewUser);
app.get('/user', middlewares.validateJWT, user.findAllUsers);
app.get('/user/:id', middlewares.validateJWT, user.findById);

app.post('/categories', middlewares.validateJWT, category.addNewCategory);
app.get('/categories', middlewares.validateJWT, category.getAllCategories);

app.post('/post', middlewares.validateJWT, middlewares.validatePost, blogPost.setNewPost);
app.get('/post', middlewares.validateJWT, blogPost.getAllPosts);
app.get('/post/:id', middlewares.validateJWT, blogPost.findPostById);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
