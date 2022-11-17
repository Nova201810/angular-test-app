import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Task } from '../../services/tasks/tasks.service';
import { Settings } from '../../@types/settings';
import { SaveTaskReturnType } from '../task-modal/task-modal.component';
import { TASK_STATUS } from '../..//@types/tasks';
import { TASK_STATUS_NAMES } from '../../constants/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  @Input() showDeleteTaskMessage!: Settings['showDeleteTaskMessage'];
  @Output() updateTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<string>();
  isModalVisible = false;
  statuses;

  constructor() {
    this.statuses = Object.entries(TASK_STATUS_NAMES).map(([value, name]) => ({ value, name }));
  }

  ngOnInit(): void {}

  onShowModal() {
    this.isModalVisible = true;
  }

  onHideModal() {
    this.isModalVisible = false;
  }

  onStatusChange(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    this.updateTask.emit({ ...this.task, status: value as TASK_STATUS });
  }

  onUpdate(updatedTaskPart: SaveTaskReturnType) {
    this.updateTask.emit({ ...this.task, ...updatedTaskPart });
  }

  onDelete() {
    let deleteTask = true;
    if (this.showDeleteTaskMessage) {
      deleteTask = confirm(`Вы точно хотите удалить задачу "${this.task.title}"?`);
    }
    if (deleteTask) {
      this.deleteTask.emit(this.task.id);
    }
  }
}
