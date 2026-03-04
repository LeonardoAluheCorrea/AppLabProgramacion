const express = require('express');
const router = express.Router();

// Simulated data - replace this with your actual data logic
const allData = Array.from({ length: 100 }, (_, i) => ({ id: i, name: `Item ${i + 1}` }));

router.get('/data', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = allData.slice(startIndex, endIndex);
  res.json(results); // Returns a list of 10 items based on the page number
});

module.exports = router;