const mocks = [
  require('./routes/settings'),
  require('./routes/tasks'),
];

const setupMocker = app => mocks.forEach(mock => mock.setup(app));

module.exports = setupMocker;
