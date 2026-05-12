module.exports = function(io) {
  setInterval(async () => {
    const liveData = {
      updated: new Date(),
      matches: []
    };

    io.emit('live-update', liveData);
  }, 10000);
};
