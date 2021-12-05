import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dataStore: {
    users: User[]
  };
  private _users: BehaviorSubject<User[]>;

  constructor(
    private http: HttpClient
  ) {
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<User[]>([]);
  }

  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  getUserById(id: number): User | undefined {
    return this.dataStore.users.find(user => user.id === id);
  }

  loadAll(): void {
    this.http.get<User[]>(environment.users).pipe(
      tap(userData => {
        this.dataStore.users = userData;
        this._users.next(Object.assign([], this.dataStore.users));
      }),
      catchError(error => {
        console.error('Failed to loadAll users: ', error);
        this._users.next(Object.assign([], []));
        return EMPTY;
      })
    ).subscribe();
  }
}
