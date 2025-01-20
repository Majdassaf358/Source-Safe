import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { FilesService } from '../../services/files.service';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../../models/ApiResponse';
import { lastValueFrom } from 'rxjs';
import { file_content } from '../../models/file-content';

@Pipe({
  name: 'nl2br',
  standalone: true
})
export class Nl2brPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>');
  }
}
@Component({
  selector: 'app-file-content',
  standalone: true,
  imports: [Nl2brPipe],
  templateUrl: './file-content.component.html',
  styleUrl: './file-content.component.css'
})
export class FileContentComponent implements OnInit {

  groupName: string = '';
    fileId:string = '';
    filecontent:file_content=new file_content;

    constructor(private fileService:FilesService,
                private route: ActivatedRoute
      ,){}
    ngOnInit(): void {
  
      this.route.paramMap.subscribe((paramsMap) => {
          this.groupName = paramsMap.get('groupName') || '';
          this.fileId = paramsMap.get('fileID') || '';
          this.getFileContent()
        });
  }
  async getFileContent(){
    
    let id:number = parseInt(this.fileId);
    try {
        let res: ApiResponse<file_content> = await lastValueFrom(
          this.fileService.viewFileDetailsContent(this.groupName,id)
        );
        this.filecontent = res.data;
        console.log(this.filecontent);
      } catch (error) {
        console.log(error);
      }
}
}
