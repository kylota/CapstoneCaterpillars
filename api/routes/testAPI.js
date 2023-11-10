const express = require('express');
const router = express.Router();
const RegisteredUser = require('../models/RegisteredUser.js');
const UnregisteredUser = require('../models/UnregisteredUser.js');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');


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

    const uniqueIdentifier = uuidv4();

    function getCurrentDateFormatted() {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
      const day = now.getDate().toString().padStart(2, '0');
    
      return `${month}-${day}-${year}`;
    }

    const formattedDate = getCurrentDateFormatted();

    const unregisteredUser = await UnregisteredUser.create({
      submittedEmail: email,
      pendingUserPassword: password,
      requestedDate: formattedDate,
      uniqueIdentifier: uuidv4()
    });
    

// Set up nodemailer transporter
// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: '', 
  auth: {
    user: '', 
    pass: '' 
  }
});
    const mailOptions = {
      from: '', // Sender address
      to: email, // Recipient address
      subject: 'Registration Confirmation',
      html: `<p>Thank you for registering. Please confirm your email by clicking on the following link: <a href="http://yourdomain.com/confirm/${uniqueIdentifier}">Confirm Email</a></p>`
    };

    console.log(`Submitted Email: ${email}\nPendingPassword: ${password}\nrequestedDate: ${formattedDate}`)

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send confirmation email' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ success: true, message: 'User registered successfully, confirmation email sent' });
      }
    });

  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;