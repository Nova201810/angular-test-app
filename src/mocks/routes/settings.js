const { delay } = require('../helpers');

let settings = {
  show_delete_task_message: false,
  set_default_status_on_create_task: true,
};

const settingsMock = {
  setup: app => {
    app.get('/api/settings', async (_, response) => {
      await delay();
      response.json({
        code: 'SUCCESS',
        data: settings,
        errors: null,
      });
    });

    app.put('/api/settings', async ({ body }, response) => {
      await delay();
      settings = body;
      response.json({
        code: 'SUCCESS',
        data: null,
        errors: null,
      });
    });
  },
};

module.exports = settingsMock;
