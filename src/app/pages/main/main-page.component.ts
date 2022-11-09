import { Component } from '@angular/core';

import { TasksService, Task } from '../../services/tasks/tasks.service';

type TasksInfo = {
  list: Task[];
} & Record<Task['status'], Task[]>;

@Component({
  selector: 'app-main',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  tasks: TasksInfo;

  constructor(private tasksService: TasksService) {
    const list = tasksService.getTasks();
    this.tasks = {
      list,
      done: list.filter(({ status }) => status === 'done'),
      created: list.filter(({ status }) => status === 'created'),
      canceled: list.filter(({ status }) => status === 'canceled'),
      paused: list.filter(({ status }) => status === 'paused'),
      progress: list.filter(({ status }) => status === 'progress'),
    };
  }
}
