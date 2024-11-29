import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authenticationReq } from '../models/authenticationReq';
import { Observable } from 'rxjs';
import { environment } from '../models/environments';
import { ApiResponse } from '../models/ApiResponse';
import { authenticationRes } from '../models/authenticationRes';
import { login } from '../models/login';
import { profile } from '../models/profile';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  public register(
    request: authenticationReq
  ): Observable<ApiResponse<authenticationRes>> {
    let url = `${environment.apiUrl}/register`;
    return this.http.post<ApiResponse<authenticationRes>>(url, request);
  }
  public login(req: login): Observable<ApiResponse<authenticationRes>> {
    let url = `${environment.apiUrl}/login`;
    return this.http.post<ApiResponse<authenticationRes>>(url, req);
  }
  public getProfile(): Observable<ApiResponse<profile>> {
    let url = `${environment.apiUrl}/my-profile`;
    return this.http.get<ApiResponse<profile>>(url);
  }
}
