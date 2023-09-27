import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  constructor(private http: HttpClient) { }

  private _getRequestsUrl = "https://localhost:7003/api/ComplaintAPI/";

  getRequests() {
    return this.http.get<any>(this._getRequestsUrl);
  }
}
