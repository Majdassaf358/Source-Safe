import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../models/environments';
import { ApiResponse } from '../models/ApiResponse';
import { groupReq } from '../models/groupReq';
import { groupRes } from '../models/groupRes';
import { temporaryy } from '../models/temporary';
import { viewgroup } from '../models/viewgroup';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private http: HttpClient) {}

  public getGroups(): Observable<temporaryy<viewgroup>> {
    let url = `${environment.apiUrl}/view-groups`;
    return this.http.get<temporaryy<viewgroup>>(url);
  }

  public createGroup(name: string): Observable<ApiResponse<groupRes>> {
    let url = `${environment.apiUrl}/create-group`;
    return this.http.post<ApiResponse<groupRes>>(url, { name: name });
  }
}
