import { Component } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms'

import { MatSnackBar } from '@angular/material/snack-bar';
import { AsyncPipe } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ThemeService } from '../../services/theme-services';
import { AuthService } from '../../services/auth-services';

@Component({
  selector: 'app-main-layout',
  imports:[
    RouterModule,
  RouterOutlet,
  FormsModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
      MatSelectModule,
  AsyncPipe
  ],
    templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
   constructor(
        public theme: ThemeService,
        private auth: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
  this.theme.load();
    }
    Logout() { 
        this.auth.logout();
       // this.snackBar.open('Sesión cerrada', 'Cerrar', { duration: 2000, horizontalPosition: 'end', verticalPosition: 'top' });
        this.router.navigate(['/login']);
    } 
}