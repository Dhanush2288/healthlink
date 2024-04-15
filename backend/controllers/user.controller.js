const knex = require('../models/connection'); // Adjust the path as needed
// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    var data =req.body
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password=hashedPassword
    var o=await knex('users').returning('id').insert(data);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

const loginUser = async (req, res) => {
  try {
    console.log('====================================');
    console.log(req.body);
    console.log('====================================');
    const { email, password } = req.body;

    const user = await knex('users').where('email', email).first();

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user.id }, 'your-secret-key');

    res.status(200).json({"token": token ,"user":user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
