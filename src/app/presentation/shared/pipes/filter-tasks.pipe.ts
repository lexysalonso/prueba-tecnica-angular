import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../../core/task.model';


@Pipe({
  name: 'taskFilter',
  pure: false 
})
export class TaskFilterPipe implements PipeTransform {
  transform(tasks: Task[], searchText: string, selectedStatus: string): Task[] {
    if (!tasks) return [];
    return tasks.filter(task => {
      const matchesText = task.title.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = selectedStatus === 'Todos' || task.status === selectedStatus;
      return matchesText && matchesStatus;
    });
  }
}

