import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();

  toggle() {
    const current = !this.darkModeSubject.value;
    this.darkModeSubject.next(current);
    localStorage.setItem('darkMode', JSON.stringify(current));
    document.body.classList.toggle('dark-theme', current);
  }

  load() {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      const isDark = JSON.parse(saved);
      this.darkModeSubject.next(isDark);
      document.body.classList.toggle('dark-theme', isDark);
    }
  }
}
