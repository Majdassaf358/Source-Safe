import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authenticationReq } from '../models/authenticationReq';
import { Observable } from 'rxjs';
import { environment } from '../models/environments';
import { ApiResponse } from '../models/ApiResponse';
import { authenticationRes } from '../models/authenticationRes';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public login(request: authenticationReq): Observable<ApiResponse<authenticationRes>> {
    let url = `${environment.apiUrl}/register`;
    return this.http.post<ApiResponse<authenticationRes>>(url, request);
  }
}