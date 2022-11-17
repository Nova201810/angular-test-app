import { Component, Input, OnInit } from '@angular/core';

import { TASK_STATUS } from '../../@types/tasks';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  @Input() status!: TASK_STATUS[keyof TASK_STATUS];
  @Input() content!: string;

  constructor() {}

  ngOnInit(): void {}
}
