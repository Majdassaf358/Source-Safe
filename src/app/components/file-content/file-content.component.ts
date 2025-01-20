import { Component, OnInit } from '@angular/core';
import { FilesService } from '../../services/files.service';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../../models/ApiResponse';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-file-content',
  standalone: true,
  imports: [],
  templateUrl: './file-content.component.html',
  styleUrl: './file-content.component.css'
})
export class FileContentComponent implements OnInit {

  groupName: string = '';
    fileId:string = '';
    content:string='';

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
        let res: ApiResponse<string> = await lastValueFrom(
          this.fileService.viewFileDetailsContent(this.groupName,id)
        );
        this.content = res.data;
        console.log(this.content);
      } catch (error) {
        console.log(error);
      }
}
}
