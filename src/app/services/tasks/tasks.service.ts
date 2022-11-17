import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Api } from '../../@types/api';
import { TaskStructure, TASK_STATUS } from '../../@types/tasks';
import { generateUniqId } from '../../helpers/generateUniqId';

type ConstructorProps = Omit<TaskStructure, 'id'>;

export class Task {
  public id;
  public title;
  public description;
  public content;
  public status;
  constructor({ title, description, content, status }: ConstructorProps) {
    this.id = generateUniqId();
    this.title = title;
    this.description = description;
    this.content = content;
    this.status = status ?? TASK_STATUS.CREATED;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private _tasks: Task[] = [];
  private isTasksRequested = false;

  constructor(private http: HttpClient) {}

  getTasksRequest(): Observable<Task[]> {
    const request = this.http.get<Api<Task[]>>('/api/tasks');
    return request.pipe(
      map(response => {
        if (response.data) {
          this._tasks = response.data;
        }
        return this._tasks;
      })
    );
  }

  addTaskRequest(task: Task) {
    return this.http.post('/api/tasks', task);
  }

  updateTaskRequest(task: Task) {
    return this.http.put('/api/tasks', task);
  }

  deleteTaskRequest(id: Task['id']) {
    return this.http.delete('/api/tasks', { body: { id } });
  }

  getTasks(): Observable<Task[]> {
    if (this.isTasksRequested) {
      return new Observable(
        (observer) => observer.next(this._tasks)
      );
    } else {
      this.isTasksRequested = true;
      return this.getTasksRequest();
    }
  }

  deleteTask(id: Task['id']) {
    this.deleteTaskRequest(id)
      .subscribe(() => {
        const targetIndex = this._tasks.findIndex(task => task.id === id);
        this._tasks.splice(targetIndex, 1);
      });
  }

  addTask(task: ConstructorProps) {
    const newTask = new Task({ ...task });
    this.addTaskRequest(newTask)
      .subscribe(() => {
        this._tasks.push(newTask);
      });;
  }

  updateTask(task: Task) {
    this.updateTaskRequest(task)
      .subscribe(() => {
        const targetTaskIndex = this._tasks.findIndex(({ id }) => id === task.id);
        this._tasks.splice(targetTaskIndex, 1, task);
      });;
  }
}
