const express = require('express');
const app = express();

const mongoose = require('mongoose');

const mongoUri = 'mongodb://127.0.0.1:27017/FSWD_C8';

const userRoute = require('./routes/userRoute');
const empRoute = require('./routes/empRoute');
const userViewRoute = require('./routes/userViewRoute');
const studentRoute = require('./routes/studentRoute');

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

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    app.listen(`3000`,()=>{
      console.log('Server is running on port http://localhost:3000');
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

startServer();