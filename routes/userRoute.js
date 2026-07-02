const express = require('express');
const router = express.Router();

const users= [
  { id: 1, name: 'John Doe', city: 'Rajkot'},
  { id:2, name: 'raj', city :'Rajkot '},
]


router.get('/',(req, res)=>{
  res.json(users);
})

router.get('/:usrId',(req, res)=>{
  const user = users.find(u => u.id === parseInt(req.params.usrId));
  if (!user){
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
})

router.post('/',(req, res)=>{
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    city: req.body.city
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.put('/:usrId',(req, res)=>{
  const user = users.find(u => u.id === parseInt(req.params.usrId));
  if (!user){
    return res.status(404).json({ error: 'User not found' });
  }
  if(req.body && req.body.name) user.name = req.body.name;
  if(req.body && req.body.city) user.city = req.body.city ;
  res.json(user);
});

router.delete('/:usrId',(req, res)=>{
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.usrId));
  if (userIndex === -1){
    return res.status(404).json({ error: 'User not found' });
  }
  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser[0]);
});

router.get('/info',(req, res)=>{
  res.send('user info page');
})

router.get('/info/:userID',(req, res)=>{
  res.send('user info page'+ req.params.userID);
})

module.exports = router;