import express from 'express';
import User from '../../model/userModel.js';
import bcrypt from 'bcryptjs';
import { sendMail } from '../../helpers/mailer';

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    await sendMail({ email, emailtype: 'VERIFY', user });
    res.status(201).json({ message: 'Signup successful, verification email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 