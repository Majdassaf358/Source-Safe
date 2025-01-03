import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { APIarray } from '../models/APIarray';
import { Invite } from '../models/invite';
import { environment } from '../models/environments';
import { response } from 'express';
import { ApiResponse } from '../models/ApiResponse';
import { nodata } from '../models/nodata';

@Injectable({
  providedIn: 'root',
})
export class InvitesService {
  private inviteCount = new BehaviorSubject<number>(0);
  inviteCount$ = this.inviteCount.asObservable();
  constructor(private http: HttpClient) {}

  public acceptInvitation(inviteID?:number): Observable<ApiResponse<nodata>> {
    let url = `${environment.apiUrl}/accept-invitation/${inviteID}`;
    return this.http.get<ApiResponse<nodata>>(url);

  }
  public rejectInvitation(inviteID?:number): Observable<ApiResponse<nodata>> {
    let url = `${environment.apiUrl}/reject-invitation/${inviteID}`;
    return this.http.get<ApiResponse<nodata>>(url);
  }

  public viewMyInvitations(): Observable<APIarray<Invite>> {
    let url = `${environment.apiUrl}/view-my-invitations`;
    return this.http.get<APIarray<Invite>>(url);
  }

  public fetchInviteCount(): void {
    this.viewMyInvitations()
      .pipe(map((response) => response.data.length))
      .subscribe((count) => {
        this.inviteCount.next(count);
      });
  }
}
