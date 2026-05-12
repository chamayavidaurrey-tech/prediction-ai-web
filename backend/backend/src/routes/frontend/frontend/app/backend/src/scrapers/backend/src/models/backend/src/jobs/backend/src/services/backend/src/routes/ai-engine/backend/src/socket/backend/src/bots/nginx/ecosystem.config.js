module.exports = {
  apps: [
    {
      name: 'football-backend',
      script: './src/server.js',
      instances: 'max',
      exec_mode: 'cluster'
    }
  ]
};
