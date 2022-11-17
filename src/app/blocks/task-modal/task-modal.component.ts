import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TasksService, Task } from '../../services/tasks/tasks.service';
import { Settings } from '../../@types/settings';
import { TASK_STATUS_NAMES } from '../../constants/task';

export type SaveTaskReturnType = Parameters<TasksService['addTask']>[0];

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css'],
})
export class TaskModalComponent implements OnChanges {
  @Input() isModalVisible!: boolean;
  @Input() heading!: string;
  @Input() task?: Task;
  @Input() setDefaultStatusOnCreateTask?: Settings['setDefaultStatusOnCreateTask'] = false;
  @Output() onHide = new EventEmitter();
  @Output() onSave = new EventEmitter<SaveTaskReturnType>();
  isSaved = true;
  form!: FormGroup;
  statuses?: { value: string, name: string }[];
  statusName: string = '';
  FIELD_NAMES: Record<keyof Omit<Task, 'id'>, string> = {
    title: 'Заголовок',
    description: 'Описание',
    content: 'Содержимое',
    status: 'Статус',
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['isModalVisible'].currentValue) {
      this.isSaved = true;
    }
    this.initializeForm();
    if (this.task) {
      this.statusName = TASK_STATUS_NAMES[this.task.status];
    }
  }

  initializeForm() {
    const { title, description, content } = this.task ?? {};
    this.form = new FormGroup({
      title: new FormControl(title ?? '', { validators: [Validators.required, Validators.minLength(3)] }),
      description: new FormControl(description ?? '', { validators: [Validators.required, Validators.minLength(5)] }),
      content: new FormControl(content ?? '', { validators: [Validators.required, Validators.minLength(10)] }),
    });

    const showStatusControl = !this.task && !this.setDefaultStatusOnCreateTask;
    if (showStatusControl) {
      this.statuses = Object.entries(TASK_STATUS_NAMES).map(([value, name]) => ({ value, name }));
      this.form.addControl('status', new FormControl(null, { validators: Validators.required }));
    }
  }

  getFieldError(fieldName: keyof Omit<Task, 'id'>) {
    const field = this.form.controls[fieldName];
    return field.invalid && field.touched;
  }

  getFieldErrorText(fieldName: keyof Omit<Task, 'id'>) {
    const field = this.form.controls[fieldName];
    const fieldLabel = this.FIELD_NAMES[fieldName].toLowerCase();
    if (field.errors && 'minlength' in field.errors) {
      return `Укажите ${fieldLabel} длиной от ${field.errors['minlength']['requiredLength']} символов`;
    }
    return `Укажите ${fieldLabel}`;
  }

  handleChangeIsSaved() {
    this.isSaved = !this.isSaved;
  }

  handleHide() {
    this.onHide.emit();
  }

  handleSave() {
    const { controls } = this.form;
    Object.values(controls).forEach(control => {
      if (control.invalid) {
        control.markAsTouched();
      }
    });
    if (this.form.invalid) return;

    const task = Object.entries(controls).reduce(
      (res, [key, { value }]) => ({ ...res, [key]: value }),
      {} as SaveTaskReturnType
    );
    this.onSave.emit(task);
  }
}
