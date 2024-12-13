import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIarray } from '../models/APIarray';
import { viewuser } from '../models/viewuser';
import { environment } from '../models/environments';
import { sendinvite } from '../models/sendinvite';
import { ApiResponse } from '../models/ApiResponse';
import { nodata } from '../models/nodata';
import { viewinvites } from '../models/viewinvites';
import { users } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<APIarray<viewuser>> {
    let url = `${environment.apiUrl}/view-users`;
    return this.http.get<APIarray<viewuser>>(url);
  }
  public getGroupUsers(name: string): Observable<ApiResponse<users>> {
    let url = `${environment.apiUrl}/${name}/view-users`;
    return this.http.get<ApiResponse<users>>(url);
  }
  public inviteUser(
    groupName: string,
    users_id: number[]
  ): Observable<APIarray<sendinvite>> {
    let url = `${environment.apiUrl}/${groupName}/invite-users`;
    return this.http.post<APIarray<sendinvite>>(url, { users_id });
  }

  public viewMyInvitations(): Observable<APIarray<viewinvites>> {
    let url = `${environment.apiUrl}/view-my-invitations`;
    return this.http.get<APIarray<viewinvites>>(url);
  }
  public acceptInvite(invitationId: number): Observable<ApiResponse<nodata>> {
    let url = `${environment.apiUrl}/accept-invitation/${invitationId}`;
    return this.http.get<ApiResponse<nodata>>(url);
  }
  public rejectInvite(invitationId: number): Observable<ApiResponse<nodata>> {
    let url = `${environment.apiUrl}/reject-invitation/${invitationId}`;
    return this.http.get<ApiResponse<nodata>>(url);
  }
  public exitGroup(groupName: string): Observable<ApiResponse<nodata>> {
    let url = `${environment.apiUrl}/${groupName}/exit-group`;
    return this.http.get<ApiResponse<nodata>>(url);
  }
  public kickFromGroup(
    groupName: string,
    userName: string
  ): Observable<ApiResponse<nodata>> {
    let url = `${environment.apiUrl}/${groupName}/kick-from-group/${userName}`;
    return this.http.get<ApiResponse<nodata>>(url);
  }
}
