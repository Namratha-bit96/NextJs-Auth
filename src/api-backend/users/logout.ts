import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  // For stateless JWT, logout is handled on the client by deleting the token
  res.json({ message: 'Logout successful' });
});

export default router; 