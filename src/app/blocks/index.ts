import { HeaderModule } from './header/header.module';

import { TaskComponent } from './task/task.component';
import { ModalComponent } from './modal/modal.component';
import { TaskModalComponent } from './task-modal/task-modal.component';

export const modules = [
  HeaderModule,
];

export const components = [
  TaskComponent,
  ModalComponent,
  TaskModalComponent,
];