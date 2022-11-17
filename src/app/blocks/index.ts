import { HeaderModule } from './header/header.module';

import { TaskComponent } from './task/task.component';
import { ModalComponent } from './modal/modal.component';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { SwitcherComponent } from './switcher/switcher.component';
import { StatusComponent } from './status/status.component';

export const modules = [
  HeaderModule,
];

export const components = [
  TaskComponent,
  ModalComponent,
  TaskModalComponent,
  SwitcherComponent,
  StatusComponent,
];