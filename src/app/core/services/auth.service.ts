import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usersKey = 'users';
  private currentUserKey = 'currentUser';

  register(user: any): void {
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  login(identifier: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    const user = users.find((u: any) =>
      (u.email === identifier || u.phone === identifier) && u.password === password
    );
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem(this.currentUserKey) || 'null');
  }
}
