// Importera nödvändiga moduler
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Skapa en Express-app
const app = express();

// Ange vyn som ska användas
app.set('view engine', 'ejs');

// Middleware för att tolka formulärdata
app.use(bodyParser.urlencoded({ extended: true }));

// Array för att lagra blogginlägg (ersätt med databas senare)
let blogPosts = [];

// GET-rout för startsidan
app.get('/', (req, res) => {
    res.render('index', { posts: blogPosts });
});

// GET-rout för att visa ett enskilt inlägg
app.get('/post/:id', (req, res) => {
    const postId = req.params.id;
    const post = blogPosts.find(post => post.id === postId);
    res.render('post', { post: post });
});

// GET-rout för att visa formuläret för att skapa ett nytt inlägg
app.get('/create', (req, res) => {
    res.render('create');
});

// POST-rout för att skicka in ett nytt inlägg
app.post('/create', (req, res) => {
    const { title, content } = req.body;
    const id = Date.now().toString(); // Enkel unik identifierare för varje inlägg
    const newPost = { id, title, content };
    blogPosts.push(newPost);
    res.redirect('/');
});

// Serverstart
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servern lyssnar på port ${PORT}`);
});
