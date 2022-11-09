import { Component, OnInit } from '@angular/core';

import { TasksService, Task } from '../../services/tasks/tasks.service';
import { SaveTaskReturnType } from '../../blocks/task-modal/task-modal.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css'],
})
export class TasksPageComponent implements OnInit {
  isModalVisible = false;
  tasks: Task[] = [];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasks = this.tasksService.getTasks();
  }

  showModal() {
    this.isModalVisible = true;
  }

  hideModal() {
    this.isModalVisible = false;
  }

  updateTask(task: Task) {
    this.tasksService.updateTask(task);
  }

  deleteTask(id: Task['id']) {
    this.tasksService.deleteTask(id);
  }

  createTask(task: SaveTaskReturnType) {
    this.tasksService.addTask(task);
    this.hideModal();
  }
}
