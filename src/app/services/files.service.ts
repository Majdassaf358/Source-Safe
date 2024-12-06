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
    temporary: string,
    files: FileList
  ): Observable<APIarray<file>> {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file_path[]', files[i]);
    }
    let url = `${environment.apiUrl}/${environment.groupName}/upload-file`;
    return this.http.post<APIarray<file>>(url, formData);
  }
}
