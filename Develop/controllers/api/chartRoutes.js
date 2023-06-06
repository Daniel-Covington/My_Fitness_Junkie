const express = require('express');
const router = express.Router();
const { WeightHistory } = require('../models');

// Endpoint to get user's weight history
router.get('/weighthistory/:userId/:range', async (req, res) => {
  try {
    // Get the user ID and range from the request parameters
    const { userId, range } = req.params;

    // Calculate the start date based on the range
    let startDate;
    switch (range) {
      case 'week':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'threeMonths':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      case 'year':
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
    }

    // Get the weight history data from the database
    const data = await WeightHistory.findAll({
      where: {
        user_id: userId,
        date: {
          [Op.gte]: startDate
        }
      },
      order: [
        ['date', 'ASC']
      ]
    });

    // Send the data as a response
    res.json(data);
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;