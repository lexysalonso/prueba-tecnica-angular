import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  username: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
     const saved = localStorage.getItem('user');
    if (saved) this.userSubject.next(JSON.parse(saved));
  }

  login(username: string, password: string): Observable<boolean> {
    const user: User = { username, token: 'fake-jwt-token' };
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    return new BehaviorSubject(true).asObservable();
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }

  get currentUser() {
    return this.userSubject.value;
  }
}
