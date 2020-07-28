const express = require('express');
const path = require('path');
const http = require('http');
const createIoSocket = require('./socket');
const app = express();

if (process.env.NODE_ENV === 'development' ) {
  const cors = require('cors');
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
  }
  app.use(cors(corsOptions));
  app.options('http://localhost:3000', cors({origin: false}));
}
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
};

const server = http.createServer(app);
const wss = createIoSocket(server);


const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
