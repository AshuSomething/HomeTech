import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) { }

  private _createRequestUrl = 'https://localhost:7003/api/ComplaintAPI';
  private _updateRequestUrl = "https://localhost:7003/api/ComplaintAPI/"
  private _getRequestsUrl = "https://localhost:7003/api/ComplaintAPI/";

  createRequest(createRequestDto: any): Observable<any> {

    return this.http.post<any>(this._createRequestUrl, createRequestDto).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  updateRequest(updateRequestDto: any): Observable<any> {

    return this.http.put<any>(this._updateRequestUrl, updateRequestDto).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }


  getRequests(Customer: any) {
    return this.http.get<any>(this._getRequestsUrl + Customer);
  }

  getRequest(Customer: any) {
    return this.http.get<any>(this._getRequestsUrl + Customer);
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
}
