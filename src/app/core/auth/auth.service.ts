import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _router: Router, private _httpClient: HttpClient) {}

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(userCredentials: any) {
    this._httpClient
      .post<any>('/login', userCredentials)
      .subscribe(async (res) => {
        const response = await res;
        localStorage.setItem('token', response.token);
        this.isLoginSubject.next(true);
        this._router.navigate(['/user/list']);
      });
  }

  logout() {
    localStorage.clear();
    this.isLoginSubject.next(false);
    this._router.navigate(['/auth/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
}
