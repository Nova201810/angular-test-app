import { TASK_STATUS } from "../@types/tasks";

export const TASK_STATUS_NAMES = {
  [TASK_STATUS.CREATED]: 'Открыто',
  [TASK_STATUS.PROGRESS]: 'В процессе',
  [TASK_STATUS.PAUSED]: 'На паузе',
  [TASK_STATUS.DONE]: 'Выполнено',
  [TASK_STATUS.CANCELED]: 'Отменено',
} as const;