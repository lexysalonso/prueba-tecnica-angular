import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';

import { TaskTableComponent } from '../../components/task-table/task-table.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Task } from '../../../core/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskService } from '../../../services/task.service';
import { Observable } from 'rxjs';
import { TaskFilterPipe } from '../../shared/pipes/filter-tasks.pipe';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ThemeService } from '../../../services/theme-services';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { takeUntilDestroyed,  } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    TaskFilterPipe,
    TaskTableComponent,
 
  ],
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss']
})
export class TasksPage implements OnInit {
   private destroyRef = inject(DestroyRef);
  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  searchText: string = '';
  selectedStatus: string = 'Todos';

    constructor(
        private taskService: TaskService,
        private dialog: MatDialog,
        private cdr: ChangeDetectorRef,
        private snackBar: MatSnackBar,
        private theme: ThemeService
    ) {
      this.theme.load();
  }
  
    
  private snackConfig: MatSnackBarConfig = {
  duration: 2500,
  horizontalPosition: 'end',
  verticalPosition: 'top'
};  

  ngOnInit(): void {
    
    const savedFilters = localStorage.getItem('taskFilters');
    if (savedFilters) {
      const { searchText, selectedStatus } = JSON.parse(savedFilters);
      this.searchText = searchText;
      this.selectedStatus = selectedStatus;
    }  
      
    
    this.taskService.tasks$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(tasks => {
        this.tasks = tasks;
        this.applyFilters();
        this.cdr.detectChanges();
    });
    this.saveFilters();
  }
  
 saveFilters() {
    localStorage.setItem('taskFilters', JSON.stringify({
      searchText: this.searchText,
      selectedStatus: this.selectedStatus
    }));
    this.applyFilters();
  }   

 
  applyFilters() {
    this.filteredTasks = this.tasks.filter(task => {
      const matchesText = task.title.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesStatus =
        this.selectedStatus === 'Todos' ? true : task.status === this.selectedStatus;
      return matchesText && matchesStatus;
    });
  }

  
  addTask() {
    const dialogRef = this.dialog.open(TaskFormComponent,{height: '400px', width: '550px'});

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result) {
          this.taskService.addTask(result);
          this.refreshTasks();
          this.cdr.detectChanges();
          this.snackBar.open('Tarea creada', 'Cerrar', this.snackConfig);
      }
    });
  }

  
  editTask(task: Task) {
    const dialogRef = this.dialog.open(TaskFormComponent, { data: task, height: '400px', width: '550px' });

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result) {
        this.taskService.updateTask({ ...task, ...result });
        this.refreshTasks();
        this.cdr.detectChanges();
        this.snackBar.open('Tarea actualizada', 'Cerrar', this.snackConfig);
      }
    });
  }

   deleteTask(task: Task) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      height: '200px',
    data: { message: `¿Usted está seguro de que desea eliminar la tarea "${task.title}"?` }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.taskService.deleteTask(task.id);
      this.refreshTasks();
      this.cdr.detectChanges();
      this.snackBar.open('Tarea eliminada', 'Cerrar', this.snackConfig);
    }
  });
}

  
  refreshTasks() {
   this.tasks = this.taskService.getTasksValue();
  this.applyFilters();
  }
}
