const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeSofaScore() {
  const response = await axios.get('https://www.sofascore.com/');

  const $ = cheerio.load(response.data);

  const matches = [];

  $('.event-card').each((i, element) => {
    matches.push({
      home: $(element).find('.home-team').text(),
      away: $(element).find('.away-team').text()
    });
  });

  return matches;
}

module.exports = {
  scrapeSofaScore
};
