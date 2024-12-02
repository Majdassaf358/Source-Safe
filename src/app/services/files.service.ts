import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIarray } from '../models/APIarray';
import { file } from '../models/file';
import { environment } from '../models/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}

  public uploadFile(filePath: file): Observable<APIarray<file>> {
    let url = `${environment.apiUrl}/register`;
    return this.http.post<APIarray<file>>(url, filePath);
  }
  upload(filePath: any): Observable<any> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', filePath, filePath.name);
    let url = `${environment.apiUrl}/${environment.groupName}/upload-file`;
    return this.http.post<APIarray<file>>(url, formData);
  }
}
