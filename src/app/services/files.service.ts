import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIarray } from '../models/APIarray';
import { file } from '../models/file';
import { environment } from '../models/environments';
import { Observable } from 'rxjs';
import { viewfile } from '../models/viewfile';
import { checkIn } from '../models/check-in';
import { fileDetails } from '../models/file_details';
import { nodata } from '../models/nodata';
import { file_changes } from '../models/file-changes';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}

  public downloadFile(groupName:string,fileId?: number): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let url = `${environment.apiUrl}/${groupName}/download`;
    return this.http.post(url, { file_id: fileId }, { headers, responseType: 'blob' });

  }


  public uploadFile(formData: any): Observable<any> {
    let url = `${environment.apiUrl}/${environment.groupName}/upload-file`;
    return this.http.post<any>(url, { file_path: formData });
  }
  public checkIn(groupName:string,files_id:number[]): Observable<APIarray<checkIn>> {
    let url = `${environment.apiUrl}/${groupName}/check-in`;
    return this.http.post<any>(url, { files_id});
  }
  public downloadtest(groupName:string,file_id?:number): Observable<string> {
    let url = `${environment.apiUrl}/${groupName}/download`;
    return this.http.post<any>(url, { file_id});
  }
  public checkOut(groupName:string,formData: any,fileId?:number): Observable<ApiResponse<file_changes>> {
    let url = `${environment.apiUrl}/${groupName}/check-out/${fileId}`;
    return this.http.post<ApiResponse<file_changes>>(url, formData );
  }
  public getFiles(groupName:string): Observable<APIarray<viewfile>> {
    let url = `${environment.apiUrl}/${groupName}/view-files`;
    return this.http.get<APIarray<viewfile>>(url);
  }
  public viewFileDetails(groupName:string,fileId?:number): Observable<APIarray<fileDetails>> {
    let url = `${environment.apiUrl}/${groupName}/view-file-details/${fileId}`;
    return this.http.get<APIarray<fileDetails>>(url);
  }
  public seeChanges(groupName:string,fileId?:number): Observable<APIarray<file_changes>> {
    let url = `${environment.apiUrl}/${groupName}/see-changes/${fileId}`;
    return this.http.get<APIarray<file_changes>>(url);
  }
  public seeUserChanges(groupName:string,fileId:number,userId:number): Observable<APIarray<file_changes>> {
    let url = `${environment.apiUrl}/${groupName}/see-user-changes/${fileId}/${userId}`;
    return this.http.get<APIarray<file_changes>>(url);
  }
  public deleteFile(groupName:string,fileId:number): Observable<nodata> {
    let url = `${environment.apiUrl}/${groupName}/delete-file/${fileId}`;
    return this.http.get<nodata>(url);
  }
}
