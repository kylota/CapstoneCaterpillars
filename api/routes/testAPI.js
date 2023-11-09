const express = require('express');
const router = express.Router();
const RegisteredUser = require('../models/RegisteredUser.js');
const UnregisteredUser = require('../models/UnregisteredUser.js');


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

router.post('/signup', async (req, res) => {
  const { email, password, requestedDate } = req.body;

  try {
    // Check if the email is already in use
    const existingUser = await RegisteredUser.findOne({ where: { verifiedEmail: email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email is already in use' });
    }

    function getCurrentDateFormatted() {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-indexed
      const day = now.getDate().toString().padStart(2, '0');
    
      return `${month}-${day}-${year}`;
    }

    const formattedDate = getCurrentDateFormatted();

    const unreigsteredUser = await UnregisteredUser.create({
      submittedEmail: email,
      pendingUserPassword: password,
      requestedDate: formattedDate
    });

    console.log(`Submitted Email: ${email}\nPendingPassword: ${password}\nrequestedDate: ${formattedDate}`)

      
    return res.status(200).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;