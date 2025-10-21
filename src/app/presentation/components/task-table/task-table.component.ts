import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Task } from '../../../core/task.model';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent {
  @Input() tasks: Task[] = [];
  @Output() edit = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<Task>();

  displayedColumns: string[] = ['title', 'description', 'status', 'actions'];

  get dataSource(): MatTableDataSource<Task> {
    return new MatTableDataSource(this.tasks);
  }

  onEdit(task: Task) {
    this.edit.emit(task);
  }

  onDelete(task: Task) {
    this.remove.emit(task);
  }
}
