import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIarray } from '../../models/APIarray';
import { viewfile } from '../../models/viewfile';
import { FilesService } from '../../services/files.service';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { error } from 'console';
import { checkIn } from '../../models/check-in';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css'
})
export class FilesComponent implements OnInit{

  groupName: string = '';
    mode:string='default';
    tem:string='';
    files: viewfile[] = [];
    selectedFiles: number[]= [];
    checkInRes:checkIn[] = [];

    constructor(private fileService:FilesService,
    private route: ActivatedRoute

    ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsMap) => {
      this.groupName = paramsMap.get('groupName') || '';
      this.viewFiles(this.groupName)
       
    });
    
  }
  enableSelect(){
    this.mode= 'select'
  }
  desaibleSelect() {
    this.mode = 'default';
  }
  temporary(){}

  addNumberToCheckIn(id?:number){
    this.selectedFiles.push(id || 0);
    this.checkIn();
  }

  async checkIn(){
    try{
      let res: APIarray<checkIn> = await lastValueFrom(
        this.fileService.checkIn(this.groupName,this.selectedFiles)
      );
      this.checkInRes=res.data;
      console.log(res);
    }
    catch (error){
      console.log(error);
    }
  }

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
