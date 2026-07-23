const express = require('express');
require('dotenv').config();
const app = express();
const databseConnection = require('./config/database');
const userRoute = require('./routes/userRoute');
const empRoute = require('./routes/empRoute');
const userViewRoute = require('./routes/userViewRoute');
const studentRoute = require('./routes/studentRoute');
const Book = require('./models/Book');
const Author = require('./models/author');

databseConnection();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get('/', (req, res) => {
  console.log('req.hostname', req.hostname);
  console.log('req.ip', req.ip);
  console.log('req.path', req.path);
  console.log('req.method', req.method);
  console.log('req.protocol', req.protocol);
  res.render('index', { title: 'Hey', message: {name: 'Nirav', age: 30} });
  // res.send('Hello World!');
});

app.post('/', (req, res) => {
  res.send('Post Request to the homepage');
});

app.get('/book', async (req, res) => {
  const books = await Book.find().populate('author');
  res.json(books);
});

app.use('/user', userRoute);
app.use('/users', userViewRoute);
app.use('/emp', empRoute);
app.use('/students', studentRoute);

app.get('/error', (req, res) => {
  throw new Error('BROKEN');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  //
  res.status(500).send('Something broke!'+ err.message);
});

app.use((req, res, next) => {
  res.status(404).render('404', { title: '404 Not Found' });
});

app.listen(process.env.POST,()=>{
  console.log('Server is running on port http://localhost:' + process.env.POST);
});