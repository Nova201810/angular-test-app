import { Injectable } from '@angular/core';

import { TASK_STATUS } from '../../constants/task';
import { generateUniqId } from '../../helpers/generateUniqId';

type Props = {
  id: string;
  title: string;
  description: string;
  content: string;
  status: TASK_STATUS;
};

type ConstructorProps = Omit<Props, 'id' | 'status'>;

export class Task {
  public id: Props['id'];
  public title: Props['title'];
  public description: Props['description'];
  public content: Props['content'];
  public status: Props['status'];
  constructor({ title, description, content }: ConstructorProps) {
    this.id = generateUniqId();
    this.title = title;
    this.description = description;
    this.content = content;
    this.status = TASK_STATUS.CREATED;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private _tasks: Task[] = [
    new Task({ title: '123', description: '1234', content: '213' }),
  ];

  getTasks(): Task[] {
    return this._tasks;
  }

  deleteTask(id: Task['id']) {
    const targetIndex = this._tasks.findIndex(task => task.id === id);
    if (targetIndex !== -1) {
      this._tasks.splice(targetIndex, 1);
    }
  }

  addTask(task: ConstructorProps) {
    this._tasks.push(new Task({ ...task }));
  }

  updateTask({ id, ...taskAttributes }: Task) {
    const targetTaskIndex = this._tasks.findIndex(task => task.id === id);
    if (targetTaskIndex !== -1) {
      this._tasks.splice(targetTaskIndex, 1, { id, ...taskAttributes });
    }
  }
}
