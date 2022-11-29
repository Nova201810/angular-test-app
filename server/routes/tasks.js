const { delay, generateRandomId } = require('../helpers');

let tasks = [
  {
    id: generateRandomId(),
    title: 'Сохраненное выполненное задание',
    description: 'Описание сохраненного выполненного задания',
    content: 'Содержимое сохраненного выполненного задания',
    status: 'done',
  },
  {
    id: generateRandomId(),
    title: 'Сохраненное открытое задание',
    description: 'Описание сохраненного открытого задания',
    content: 'Содержимое сохраненного открытого задания',
    status: 'created',
  },
  {
    id: generateRandomId(),
    title: 'Сохраненное отмененное задание',
    description: 'Описание сохраненного отмененного задания',
    content: 'Содержимое сохраненного отмененного задания',
    status: 'canceled',
  },
  {
    id: generateRandomId(),
    title: 'Сохраненное задание в процессе',
    description: 'Описание сохраненного задания в процессе',
    content: 'Содержимое сохраненного задания в процессе',
    status: 'progress',
  },
  {
    id: generateRandomId(),
    title: 'Сохраненное задание на паузе',
    description: 'Описание сохраненного задания на паузе',
    content: 'Содержимое сохраненного задания на паузе',
    status: 'paused',
  },
];

const settingsMock = {
  setup: app => {
    app.get('/api/tasks', async (_, response) => {
      await delay();
      response.json({
        code: 'SUCCESS',
        data: tasks,
        errors: null,
      });
    });

    app.put('/api/tasks', async ({ body }, response) => {
      await delay();
      const taskIndex = tasks.findIndex(task => task.id === body.id);
      if (taskIndex !== -1) {
        tasks[taskIndex] = body;
        response.json({
          code: 'SUCCESS',
          data: null,
          errors: null,
        });
      } else {
        response.status(400).json({
          code: 'BAD_REQUEST',
          data: null,
          errors: ['UNKNOWN_TASK'],
        });
      }
    });

    app.post('/api/tasks', async ({ body }, response) => {
      await delay();
      tasks = tasks ? [...tasks, body] : [body];
      response.json({
        code: 'SUCCESS',
        data: null,
        errors: null,
      });
    });

    app.delete('/api/tasks', async ({ body }, response) => {
      await delay();
      const taskIndex = tasks.findIndex(task => task.id === body.id);
      if (taskIndex !== -1) {
        tasks = tasks.filter(task => task.id !== body.id);
        response.json({
          code: 'SUCCESS',
          data: null,
          errors: null,
        });
      } else {
        response.status(400).json({
          code: 'BAD_REQUEST',
          data: null,
          errors: ['UNKNOWN_TASK'],
        });
      }
    });
  },
};

module.exports = settingsMock;
