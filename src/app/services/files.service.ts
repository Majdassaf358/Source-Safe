import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIarray } from '../models/APIarray';
import { file } from '../models/file';
import { environment } from '../models/environments';
import { Observable } from 'rxjs';
import { viewfile } from '../models/viewfile';
import { checkIn } from '../models/check-in';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}

  public uploadFile(formData: any): Observable<any> {
    let url = `${environment.apiUrl}/${environment.groupName}/upload-file`;
    return this.http.post<any>(url, { file_path: formData });
  }
  public checkIn(groupName:string,files_id:number[]): Observable<APIarray<checkIn>> {
    let url = `${environment.apiUrl}/${groupName}/check-in`;
    return this.http.post<any>(url, { files_id});
  }
  public checkOut(formData: any): Observable<any> {
    let url = `${environment.apiUrl}/${environment.groupName}/check-out`;
    return this.http.post<any>(url, { file_path: formData });
  }
  public getFiles(groupName:string): Observable<APIarray<viewfile>> {
    let url = `${environment.apiUrl}/${groupName}/view-files`;
    return this.http.get<APIarray<viewfile>>(url);
  }
  public getFiles1(groupName:string): Observable<APIarray<viewfile>> {
    let url = `${environment.apiUrl}/${groupName}/view-files`;
    return this.http.get<APIarray<viewfile>>(url);
  }
  public getFiles2(groupName:string): Observable<APIarray<viewfile>> {
    let url = `${environment.apiUrl}/${groupName}/view-files`;
    return this.http.get<APIarray<viewfile>>(url);
  }
  public getFiles3(groupName:string): Observable<APIarray<viewfile>> {
    let url = `${environment.apiUrl}/${groupName}/view-files`;
    return this.http.get<APIarray<viewfile>>(url);
  }
  public getFiles4(groupName:string): Observable<APIarray<viewfile>> {
    let url = `${environment.apiUrl}/${groupName}/view-files`;
    return this.http.get<APIarray<viewfile>>(url);
  }
}
