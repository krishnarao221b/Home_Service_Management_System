import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, map } from 'rxjs';
import { IUser } from '../shared/models/user';
import { Router } from '@angular/router';
import { IAddress } from '../shared/models/address';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:7015/api/';

 // private currentUserSource = new ReplaySubject<IUser | null>(1);
  private currentUserSource: ReplaySubject<IUser | null> = new ReplaySubject<IUser | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }


  loadCurrentUser(token: string): Observable<IUser | null> {
    if (token === null) {
      this.currentUserSource.next(null);
      return new Observable<IUser | null>(observer => observer.next(null)); // Emit null as observable
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<IUser>(this.baseUrl + 'account', { headers }).pipe(
      map((user: IUser) => {
        if (user) {
          console.log('Loaded user:', user);
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        } else {
          console.log('No user found bro 3');
        }
        return user; // Return the user for further processing
      })
    );
  }



  login(values: any) {
    return this.http.post<IUser>(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          console.log('Token after login:', localStorage.getItem('token'));
          this.currentUserSource.next(user);
          console.log('Current user updated:', this.currentUserSource.next(user));
        }
        return user; 
      })
    );
  }

  register(values: any) {
    return this.http.post<IUser>(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<{ exists: boolean }>(this.baseUrl + 'account/emailexists?email=' + email).pipe(
      map(response => response.exists)
    );
  }

  getUserAddress() {
    const token = localStorage.getItem('token');
    console.log('Token in getUserAddress:', token);

    return this.http.get<IAddress>(this.baseUrl + 'account/address');
  }
  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseUrl + 'account/address', address);
  }

}
