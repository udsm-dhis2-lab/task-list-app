import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'current-tasks',
    pathMatch: 'full',
  },
  {
    path: 'current-tasks',
    loadComponent: () =>
      import('./pages/current-tasks/current-tasks.component').then(
        (m) => m.CurrentTasksComponent
      ),
  },

  {
    path: 'await-approval',
    loadComponent: () =>
      import('./pages/awaiting-approval/awaiting-approval.component').then(
        (m) => m.AwaitingApprovalComponent
      ),
  },
  {
    path: 'need-correction',
    loadComponent: () =>
      import('./pages/need-correction/need-correction.component').then(
        (m) => m.NeedCorrectionComponent
      ),
  },
  {
    path: 'completed',
    loadComponent: () =>
      import('./pages/completed-tasks/completed-tasks.component').then(
        (m) => m.CompletedTasksComponent
      ),
  },
];
