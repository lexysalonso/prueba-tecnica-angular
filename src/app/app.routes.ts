import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { MainLayoutComponent } from './presentation/loyout/main-layout.component';
  


export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./presentation/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: '',
    component: MainLayoutComponent,   
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./presentation/dashbaord/dashboard.component')
          .then(m => m.DashboardComponent),
      },
      {
        path: 'tasks',
        loadChildren: () => import('../app/router/router-task')
          .then(r => r.TASKS_ROUTES),
        canActivate: [AuthGuard],
      },
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    ]
  }
];
