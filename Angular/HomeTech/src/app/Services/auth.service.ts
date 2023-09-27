import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "https://localhost:7002/api/AuthAPI/register";
  private _loginUrl = "https://localhost:7002/api/AuthAPI/login";
  private _updateUrl = "https://localhost:7002/api/AuthAPI";
  constructor(private http: HttpClient) { }


  registerUser(requestDto: any): Observable<any> {

    return this.http.post<any>(this._registerUrl, requestDto).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  loginUser(requestDto: any): Observable<any> {

    return this.http.post<any>(this._loginUrl, requestDto).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  updateUser(updateRequestDto: any): Observable<any> {

    return this.http.put<any>(this._updateUrl, updateRequestDto).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getJwtData() {
    var token = this.getToken() as string;
    const [header, payload, signature] = token.split('.');
    const decodedPayload = this.decodeBase64Url(payload);
    const payloadData = JSON.parse(decodedPayload);
    return payloadData;
  }

  logOutUser() {
    localStorage.removeItem('token');
  }

  private decodeBase64Url(base64Url: string): string {
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return atob(base64);
  }
}

//MrX coustmer
//localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTXJYIiwiZW1haWwiOiJ4QGdtYWlsLmNvbSIsInN1YiI6IjFhMzViNGMyLTUyMjAtNDAwYy04MTVkLWQ2Yjg5NjE4ZTY2YyIsInJvbGUiOiJDdXN0b21lciIsIm5iZiI6MTY5NTM5MDAzNiwiZXhwIjoxNjk1OTk0ODM2LCJpYXQiOjE2OTUzOTAwMzYsImlzcyI6IkhvbWUtVGVjaC1hdXRoLWFwaSIsImF1ZCI6IkhvbWUtVGVjaC1jbGllbnQifQ.RvEuCXp1V3w7HWJPU9U8qp6QkjsuzkXvfHZ1DWBX5N0")
//MrY Technician
//localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTXJZIiwiZW1haWwiOiJZQGdtYWlsLmNvbSIsInN1YiI6IjZkYjk4YTgxLWM2YjUtNGQyNi05NjVkLWU1ZDc4OGI3Y2FiYyIsInJvbGUiOiJUZWNobmljaWFuIiwibmJmIjoxNjk1MzkwMTIyLCJleHAiOjE2OTU5OTQ5MjIsImlhdCI6MTY5NTM5MDEyMiwiaXNzIjoiSG9tZS1UZWNoLWF1dGgtYXBpIiwiYXVkIjoiSG9tZS1UZWNoLWNsaWVudCJ9.oXa73BnYeYde9erynZ3uRJbIdC0F6coHXfsndX-UmtA")