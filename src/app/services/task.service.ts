import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Task } from '../core/task.model'; // asegúrate de importar el tipo correcto
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksUrl = 'assets/data/tasks.json'; 
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  private storageKey = 'tasks';

  constructor(private http: HttpClient) {
    this.initTasks();
  }

    private saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasksSubject.value));
  } 
    
  
  private initTasks() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      const parsed: Task[] = JSON.parse(saved);
      this.tasksSubject.next(parsed);
    } else {
      this.loadTasksFromJson();
    }
  }

  private loadTasksFromJson() {
    this.http.get<Task[]>(this.tasksUrl).subscribe((tasks:any) => {
      this.tasksSubject.next(tasks);
      this.saveToStorage();
    });
  }

  
  addTask(task: Omit<Task, 'id'>) {
    const newTask: Task = { ...task, id: Date.now() };
    this.tasksSubject.next([...this.tasksSubject.value, newTask]);
    this.saveToStorage();
  }


  updateTask(updatedTask: Task) {
      const current = this.tasksSubject.value.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasksSubject.next(current);
    this.saveToStorage();
  }

  
  deleteTask(taskId: number) {
    const current = this.tasksSubject.value.filter(task => task.id !== taskId);
    this.tasksSubject.next(current);
    this.saveToStorage();
  }


  filterByStatus(status: string): Observable<Task[]> {
    if (!status) return this.tasks$;
    return this.tasks$.pipe(map(tasks => tasks.filter(t => t.status === status)));
  }

 
  refreshTasks() {
    this.tasksSubject.next(this.tasksSubject.value);
  }
  
getTasksValue(): Task[] {
  return this.tasksSubject.value;
}
}
