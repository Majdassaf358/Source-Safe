import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIarray } from '../../models/APIarray';
import { viewfile } from '../../models/viewfile';
import { FilesService } from '../../services/files.service';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css'
})
export class FilesComponent implements OnInit{

  groupName: string = '';
    mode:string='';
    tem:string='';
  files: viewfile[] = [];

    constructor(private fileService:FilesService,
    private route: ActivatedRoute

    ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsMap) => {
      this.groupName = paramsMap.get('groupName') || '';
      this.viewFiles(this.groupName)
       
    });
    
  }

  temporary(){}

  
  async viewFiles(group:string) {
    try {
      let res: APIarray<viewfile> = await lastValueFrom(
        this.fileService.getFiles(group)
      );
      this.files = res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
