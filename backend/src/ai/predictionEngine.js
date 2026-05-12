const axios = require('axios');

class PredictionEngine {
  constructor() {
    this.weights = {
      form: 0.25,
      xg: 0.20,
      elo: 0.20,
      injuries: 0.10,
      homeAdvantage: 0.15,
      motivation: 0.10
    };
  }

  async getMatchData(matchId) {
    const response = await axios.get(
      `https://v3.football.api-sports.io/fixtures?id=${matchId}`,
      {
        headers: {
          'x-apisports-key': process.env.FOOTBALL_API_KEY
        }
      }
    );

    return response.data.response[0];
  }

  calculateWinProbability(stats) {
    const homeScore = (
      stats.homeForm * this.weights.form +
      stats.homeXG * this.weights.xg +
      stats.homeELO * this.weights.elo +
      stats.homeAdvantage * this.weights.homeAdvantage
    );

    const awayScore = (
      stats.awayForm * this.weights.form +
      stats.awayXG * this.weights.xg +
      stats.awayELO * this.weights.elo
    );

    const total = homeScore + awayScore;

    return {
      home: (homeScore / total) * 100,
      away: (awayScore / total) * 100
    };
  }

  generatePrediction(probabilities) {
    if (probabilities.home > probabilities.away) {
      return {
        winner: 'HOME',
        confidence: probabilities.home,
        recommendation: 'Ganador Local'
      };
    }

    return {
      winner: 'AWAY',
      confidence: probabilities.away,
module.exports = new PredictionEngine();
