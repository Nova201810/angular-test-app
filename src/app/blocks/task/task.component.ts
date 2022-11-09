import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Task } from '../../services/tasks/tasks.service';
import { SaveTaskReturnType } from '../task-modal/task-modal.component';
import { TASK_STATUS, TASK_STATUS_NAME } from '../../constants/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  @Output() updateTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<string>();
  isModalVisible = false;
  statuses;

  constructor() {
    this.statuses = Object.entries(TASK_STATUS_NAME).map(([value, name]) => ({ value, name }));
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
    this.deleteTask.emit(this.task.id);
  }
}
