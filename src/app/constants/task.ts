export enum TASK_STATUS {
  CREATED = 'created',
  PROGRESS = 'progress',
  PAUSED = 'paused',
  CANCELED = 'canceled',
  DONE = 'done',
};

export const TASK_STATUS_NAME = {
  [TASK_STATUS.CREATED]: 'Открыто',
  [TASK_STATUS.PROGRESS]: 'В процессе',
  [TASK_STATUS.PAUSED]: 'На паузе',
  [TASK_STATUS.DONE]: 'Выполнено',
  [TASK_STATUS.CANCELED]: 'Отменено',
} as const;