const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;
const mongoose = require('mongoose');
require('dotenv').config();

const UserModel = require('./Models/Users');

app.use(cors());
app.use(express.json()); 

//Creation de Users
app.post('/api/users', async (req, res) => {
  try {
    const { name, age, email } = req.body; 
    const newUser = new UserModel({ name, age, email });
    await newUser.save();

    res.status(201).json(newUser); 
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Prendre les Users
app.get('/api/users', async(req,res)=>{
  try{
    const users= await UserModel.find();
    res.json(users);}
    catch(error){
      console.log('Error fetching users:', error);
      res.status(500).json({error:'Internal Server Error'});
    }
});
//Connection a MDB
mongoose
  .connect(
    `mongodb+srv://omartakyot:${process.env.MONGODB_PASSWORD}@cluster0.mxrkn5l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
