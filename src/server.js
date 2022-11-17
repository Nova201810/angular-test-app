const express = require('express');
const bodyParser = require('body-parser');

const setupMocker = require('./mocks');

function startMockServer() {
  // При изменении обновить порт в proxy.conf.json
  const port = 3001;

  const server = express();
  server.use(bodyParser.json());
  setupMocker(server);
  server.listen(port, () => {
    console.log(`> Mock server is ready on http://localhost:${port}`);
  });
}

startMockServer();
