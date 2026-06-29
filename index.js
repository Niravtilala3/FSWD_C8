const express = require('express');
const app = express();
const userRoute = require('./routes/userRoute');
const empRoute = require('./routes/empRoute');

app.set('view engine', 'ejs');
app.set('views', './views');


app.get('/', (req, res) => {
  const message = {name: 'Nirav', age: 30};
  res.render('index', { title: 'Hey', message: message });
  // res.send('Hello World!');
});

app.post('/', (req, res) => {
  res.send('Post Request to the homepage');
});

app.use('/user', userRoute);
app.use('/emp', empRoute);

app.listen(3000,()=>{
  console.log('Server is running on port http://localhost:3000');
});