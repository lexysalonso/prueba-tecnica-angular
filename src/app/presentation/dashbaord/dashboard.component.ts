import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from '../../core/task.model';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables, ChartOptions, ChartConfiguration, ChartData } from 'chart.js';

import { MatCardModule } from '@angular/material/card';


Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,BaseChartDirective,  MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    
  private sub = new Subscription();

  doughnutData: ChartData<'doughnut'> = {
    labels: ['Pendiente', 'En progreso', 'Completada'],
    datasets: [
      { data: [0, 0, 0], backgroundColor: ['#ef5350', '#ffca28', '#66bb6a'] }
    ]
  };

  barData: ChartData<'bar'> = {
    labels: ['Pendiente', 'En progreso', 'Completada'],
    datasets: [
      {
        label: 'Tareas',
        data: [0, 0, 0],
        backgroundColor: ['#42a5f5', '#ab47bc', '#26a69a']
      }
    ]
  };

  doughnutOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } }
  };

  barOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: { y: { beginAtZero: true } },
    plugins: { legend: { display: false } }
  };

   constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.sub.add(
      this.taskService.tasks$.subscribe(tasks => this.updateCharts(tasks))
    );
  }
 
  private updateCharts(tasks: Task[]) {
    const counts = { Pendiente: 0, 'En progreso': 0, Completada: 0 };
    tasks.forEach(t => {
      if (counts[t.status] !== undefined) counts[t.status]++;
    });

    const values = [counts.Pendiente, counts['En progreso'], counts.Completada];

    this.doughnutData = {
      labels: ['Pendiente', 'En progreso', 'Completada'],
      datasets: [
        { data: values, backgroundColor: ['#ef5350', '#ffca28', '#66bb6a'] }
      ]
    };

    this.barData = {
      labels: ['Pendiente', 'En progreso', 'Completada'],
      datasets: [
        {
          label: 'Tareas',
          data: values,
          backgroundColor: ['#42a5f5', '#ab47bc', '#26a69a']
        }
      ]
    };
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }  

  stats = [
    { title: 'Tareas Completadas', value: 12 },
    { title: 'En Progreso', value: 5 },
    { title: 'Pendientes', value: 8 },
  ];
}
