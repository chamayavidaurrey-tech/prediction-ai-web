'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    loadPrediction();
  }, []);

  const loadPrediction = async () => {
    const response = await axios.get(
      'http://localhost:5000/api/predictions/match/1234'
    );

    setPrediction(response.data);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        Football AI Predictor
      </h1>

      {prediction && (
        <div className="bg-zinc-900 p-6 rounded-2xl">
          <h2 className="text-3xl mb-4">
            Pronóstico IA
          </h2>

          <div className="text-xl">
            Recomendación: {prediction.prediction.recommendation}
          </div>

          <div className="mt-4 text-green-400 text-2xl">
            Confianza: {prediction.prediction.confidence.toFixed(2)}%
          </div>
        </div>
      )}
    </div>
  );
}
