import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, addDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id?: string;
  email: string;
  password: string; // In production, store hashed passwords!
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private firestore: Firestore) {
    
  if (typeof window !== 'undefined' && window.localStorage) {
  const storedUser = localStorage.getItem('loggedInUser');
  if (storedUser) {
    this.currentUserSubject.next(JSON.parse(storedUser));
  }
}
  }

  async register(email: string, password: string, role: string = 'user'): Promise<void> {
    // Check if user already exists
    const existingUser = await this.getUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Add user to Firestore (hash password in real app)
    await addDoc(collection(this.firestore, 'users'), {
      email,
      password,  // Never store plain passwords in production!
      role
    });
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.password !== password) {
      throw new Error('Invalid password');
    }
    this.currentUserSubject.next(user);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    return user;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('loggedInUser');
  }

  private async getUserByEmail(email: string): Promise<User | null> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...(doc.data() as User) };
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
