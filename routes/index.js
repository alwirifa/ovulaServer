import express from 'express';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

   
    res.status(201).json({
      error: false,
      message: "success",
      data: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

   
    res.status(201).json({
      error: false,
      message: "success",
      data: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const { } = req.body;

   
    res.status(201).json({
      error: false,
      message: "success",
      data: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/logout', async (req, res) => {
  try {
    const { } = req.body;

   
    res.status(201).json({
      error: false,
      message: "success",
      data: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

