import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from './constants/routes';
import { MainPageComponent } from './pages/main/main-page.component';
import { TasksPageComponent } from './pages/tasks/tasks-page.component';
import { SettingsPageComponent } from './pages/settings/settings-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: ROUTES.TASKS, component: TasksPageComponent },
  { path: ROUTES.SETTINGS, component: SettingsPageComponent },
  { path: '**', redirectTo: ROUTES.MAIN },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
