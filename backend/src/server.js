require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    status: 'running',
    platform: 'Football AI Platform'
  });
});

const predictionRoutes = require('./routes/predictions');
app.use('/api/predictions', predictionRoutes);

io.on('connection', socket => {
  console.log('Usuario conectado');

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${process.env.PORT}`);
});
