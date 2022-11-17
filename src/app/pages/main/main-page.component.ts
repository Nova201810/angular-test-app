import { Component, OnInit } from '@angular/core';

import { TasksService, Task } from '../../services/tasks/tasks.service';
import { TASK_STATUS } from '../../@types/tasks';

type TasksInfo = {
  list: Task[];
} & Record<Task['status'], Task[]>;

@Component({
  selector: 'app-main',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  tasks?: TasksInfo;
  statuses;

  constructor(private tasksService: TasksService) {
    this.statuses = TASK_STATUS;
  }

  ngOnInit(): void {
    let list: TasksInfo['list'] = [];
    this.tasksService.getTasks()
      .subscribe(tasks => {
        list = tasks;
        this.tasks = {
          list,
          done: list.filter(({ status }) => status === 'done'),
          created: list.filter(({ status }) => status === 'created'),
          canceled: list.filter(({ status }) => status === 'canceled'),
          paused: list.filter(({ status }) => status === 'paused'),
          progress: list.filter(({ status }) => status === 'progress'),
        };
      });
  }
}
