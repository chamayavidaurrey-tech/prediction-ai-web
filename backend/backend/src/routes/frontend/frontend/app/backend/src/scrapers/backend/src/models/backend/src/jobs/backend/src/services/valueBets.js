function findValueBets(matches) {
  return matches.filter(match => {
    return (
      match.odds.home >= 2.0 &&
      match.aiConfidence >= 75
    );
  });
}

module.exports = {
  findValueBets
};
