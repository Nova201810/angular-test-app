import { Component, OnInit } from '@angular/core';

import { TasksService, Task } from '../../services/tasks/tasks.service';
import { SaveTaskReturnType } from '../../blocks/task-modal/task-modal.component';
import { TASK_STATUS_NAMES } from '../../constants/task';
import { Settings } from '../../@types/settings';
import { SettingsService } from 'src/app/services/settings/settings.service';

const STATUS_ALL = 'all';
const STATUS_ALL_LABEL = 'Все';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css'],
})
export class TasksPageComponent implements OnInit {
  isModalVisible = false;
  tasks?: Task[];
  settings?: Settings;
  statuses;
  filterStatusValue = STATUS_ALL;

  constructor(private tasksService: TasksService, private settingsService: SettingsService) {
    const filterStatuses = {
      [STATUS_ALL]: STATUS_ALL_LABEL,
      ...TASK_STATUS_NAMES,
    };
    this.statuses = Object.entries(filterStatuses).map(([value, name]) => ({ value, name }));
  }

  ngOnInit(): void {
    this.settingsService.getSettings()
      .subscribe(settings => {
        this.settings = settings;
      });
    this.tasksService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }

  onStatusChange(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    this.filterStatusValue = value;
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
