import express from 'express';
import User from '../../model/userModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({ verifyToken: token, verifyTokenExpire: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpire = undefined;
    await user.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 