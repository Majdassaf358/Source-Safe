import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIarray } from '../models/APIarray';
import { viewuser } from '../models/viewuser';
import { environment } from '../models/environments';
import { invite } from '../models/invite';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<APIarray<viewuser>> {
    let url = `${environment.apiUrl}/view-users`;
    return this.http.get<APIarray<viewuser>>(url);
  }
  public inviteUser(
    groupName: string,
    users_id: number[]
  ): Observable<APIarray<invite>> {
    let url = `${environment.apiUrl}/${groupName}/invite-users`;
    return this.http.post<APIarray<invite>>(url, { users_id });
  }
}
