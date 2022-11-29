const express = require('express');
const bodyParser = require('body-parser');

const mocks = [
  require('./routes/settings'),
  require('./routes/tasks'),
];

const setupMocker = app => mocks.forEach(mock => mock.setup(app));

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
