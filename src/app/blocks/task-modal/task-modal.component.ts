import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TasksService, Task } from '../../services/tasks/tasks.service';

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
  @Output() onHide = new EventEmitter();
  @Output() onSave = new EventEmitter<SaveTaskReturnType>();
  form!: FormGroup;
  FIELD_NAMES: Record<keyof Omit<Task, 'id' | 'status'>, string> = {
    title: 'Заголовок',
    description: 'Описание',
    content: 'Содержимое',
  };

  constructor() {}

  ngOnChanges(): void {
    this.initializeForm();
  }

  initializeForm() {
    const { title, description, content } = this.task ?? {};
    this.form = new FormGroup({
      title: new FormControl(title ?? '', { validators: [Validators.required, Validators.minLength(3)] }),
      description: new FormControl(description ?? '', { validators: [Validators.required, Validators.minLength(5)] }),
      content: new FormControl(content ?? '', { validators: [Validators.required, Validators.minLength(10)] }),
    });
  }

  getFieldError(fieldName: keyof Omit<Task, 'id' | 'status'>) {
    const field = this.form.controls[fieldName];
    return field.invalid && field.touched;
  }

  getFieldErrorText(fieldName: keyof Omit<Task, 'id' | 'status'>) {
    const field = this.form.controls[fieldName];
    const fieldLabel = this.FIELD_NAMES[fieldName].toLowerCase();
    if (field.errors && 'minlength' in field.errors) {
      return `Укажите ${fieldLabel} длиной от ${field.errors['minlength']['requiredLength']} символов`;
    }
    return `Укажите ${fieldLabel}`;
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
