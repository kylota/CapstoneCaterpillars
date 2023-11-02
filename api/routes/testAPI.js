const express = require('express');
const router = express.Router();
const RegisteredUser = require('../models/RegisteredUser.js');


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await RegisteredUser.findOne({ where: { verifiedEmail: email } });
    
    if (!user) {
      return res.status(401).json({ success: false, message: 'Email not found' });
    }
    
    if (user.password === password) {
      return res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;