const express = require('express');
const router = express.Router();
const engine = require('../ai/predictionEngine');

router.get('/match/:id', async (req, res) => {
  try {
    const matchId = req.params.id;

    const matchData = await engine.getMatchData(matchId);

    const probabilities = engine.calculateWinProbability({
      homeForm: 80,
      awayForm: 55,
      homeXG: 75,
      awayXG: 50,
      homeELO: 78,
      awayELO: 60,
      homeAdvantage: 85
    });

    const prediction = engine.generatePrediction(probabilities);

    res.json({
      success: true,
      match: matchData,
      prediction
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;
