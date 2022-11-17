export enum TASK_STATUS {
  CREATED = 'created',
  PROGRESS = 'progress',
  PAUSED = 'paused',
  CANCELED = 'canceled',
  DONE = 'done',
};

export type TaskStructure = {
  id: string;
  title: string;
  description: string;
  content: string;
  status?: TASK_STATUS;
};