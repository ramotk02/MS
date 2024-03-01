const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;
const mongoose = require('mongoose');
require('dotenv').config();

const UserModel = require('./Models/Users');

app.use(cors());
app.use(express.json());

// Création d'un utilisateur
app.post('/api/users', async (req, res) => {
  try {
    console.log(req.body);
    const { name, age, email } = req.body;
    const newUser = new UserModel({ name, age, email });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Obtenir tous les utilisateurs
app.get('/api/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Users
app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    
    user.name = req.body.name;
    user.age = req.body.age;
    user.email = req.body.email;

    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete User:
app.delete('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Connexion à MongoDB
mongoose
  .connect(
    `mongodb+srv://omartakyot:${process.env.MONGODB_PASSWORD}@cluster0.mxrkn5l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
