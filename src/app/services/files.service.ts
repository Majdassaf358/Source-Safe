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

  public uploadFile(
    filePath: string,
    formData: string
  ): Observable<APIarray<file>> {
    let url = `${environment.apiUrl}/${environment.groupName}/upload-file`;
    return this.http.post<APIarray<file>>(url, { file_path: formData });
  }
}
