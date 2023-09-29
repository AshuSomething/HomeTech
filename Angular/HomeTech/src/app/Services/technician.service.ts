import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {


  constructor(private http: HttpClient) { }

  private _complaintApiUrl = "https://localhost:7003/api/ComplaintAPI/";
  private _acceptRequestUrl = 'https://localhost:7069/api/AcceptRequestApi';

  getRequests() {
    return this.http.get<any>(this._complaintApiUrl).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  postRequest(AcceptRequestDto: any): Observable<any> {
    return this.http.post<any>(this._acceptRequestUrl, AcceptRequestDto).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    )
  }

  deleteRequest(complaintID: any): Observable<any> {

    return this.http.delete(this._complaintApiUrl + "?id=" + complaintID).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  getRequestsfromAcceptRequestAPI(TechnicainId: string) {
    return this.http.get<any>(this._acceptRequestUrl + "/" + TechnicainId).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  deleteRequestsfromAcceptRequestAPI(Id: any) {
    return this.http.delete(this._acceptRequestUrl + "/" + Id).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    )
  }

  addrequestInComplaintAPI(ComplaintDto: any) {
    return this.http.post<any>(this._complaintApiUrl, ComplaintDto).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    )
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
