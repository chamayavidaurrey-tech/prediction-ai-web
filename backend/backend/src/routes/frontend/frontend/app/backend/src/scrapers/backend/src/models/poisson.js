function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

function poisson(lambda, k) {
  return (
    (Math.pow(lambda, k) * Math.exp(-lambda)) /
    factorial(k)
  );
}

function predictScore(homeXG, awayXG) {
  let bestProbability = 0;
  let prediction = '0-0';

  for (let home = 0; home <= 5; home++) {
    for (let away = 0; away <= 5; away++) {
      const probability =
        poisson(homeXG, home) *
        poisson(awayXG, away);

      if (probability > bestProbability) {
        bestProbability = probability;
        prediction = `${home}-${away}`;
      }
    }
  }

  return {
    prediction,
    probability: bestProbability
  };
}

module.exports = {
  predictScore
};
