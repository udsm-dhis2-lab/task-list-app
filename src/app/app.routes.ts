import { Routes } from '@angular/router';

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
];
