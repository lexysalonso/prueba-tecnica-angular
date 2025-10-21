import { Routes } from '@angular/router';


export const enum TASK_ROUTES  {
    task = ''
}

export const TASKS_ROUTES: Routes = [
  {
        path: TASK_ROUTES.task,
        loadComponent: () => import('../presentation/pages/tasks/tasks.page').then(t => t.TasksPage) ,
  },
  
];