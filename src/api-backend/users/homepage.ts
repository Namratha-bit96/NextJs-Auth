import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to our Art Store — a vibrant digital space where creativity meets craftsmanship. We believe that art has the power to transform spaces, evoke emotions, and tell stories that words cannot.'
  });
});

export default router; 