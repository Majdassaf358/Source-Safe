import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { APIarray } from '../../models/APIarray';
import { viewfile } from '../../models/viewfile';
import { FilesService } from '../../services/files.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { error } from 'console';
import { checkIn } from '../../models/check-in';
import { fileUpload } from '../../models/file-upload';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { file_changes } from '../../models/file-changes';
import { ApiResponse } from '../../models/ApiResponse';
import { fileDetails } from '../../models/file_details';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [FormsModule, CommonModule,TranslateModule,RouterModule],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css'
})
export class FilesComponent implements OnInit{

  groupName: string = '';
    mode:string='default';
    tem:string='';
    test:string='';
    files: viewfile[] = [];
    checkInFiles: number[]= [];
    checkInRes:checkIn[] = [];
    checkOutRes:file_changes = new  file_changes;
    uploadForm !: FormGroup;
    currentFile !: File;
    checkOutFile !: File;
    checkOutFileNumber ?: number = 0;
    checkOutDescrirtion?: string;
    fileDetailsInfo:fileDetails[] =[]; 
    fileChanges:file_changes[]=[];

    selectedFiles:any[]=[];
    uploadedFiles:fileUpload[]=[];

    constructor(private fileService:FilesService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder : FormBuilder
    ){}

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      'file_path[]':[]
    });
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

  addNumberToCheckOut(id?:number){
    this.checkOutFileNumber=id;
    this.checkOut();
  }
  
  onFileSelectedCheckOut(event:any){
    this.checkOutFile = event.target.files[0];
  }
  async checkOut(){
    const checkOutData = new FormData;
    checkOutData.append('file_path', this.checkOutFile);
    // checkOutData.append('description','checkOutDescrirtion' );
    
    console.log(this.checkOutFile);
    checkOutData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
  });
    try{
      let res: ApiResponse<file_changes> = await lastValueFrom(
        this.fileService.checkOut(this.groupName,checkOutData,this.checkOutFileNumber)
      );
      this.checkOutRes=res.data;
      console.log("checkOut true",res.data);
    }
    catch (error){
      console.log(error);
    }
  }
  addNumberToCheckIn(id:number,fileName:string){
    this.checkInFiles.push(id || 0);
    this.checkIn(fileName);
  }
  async download(fileId:number[],fileName:string){
    this.fileService.downloadFile(this.groupName,fileId).subscribe(
      (blob: Blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      (error) => {
        console.error('File download error:', error);
    }
  );
}
  async checkIn(fileName:string){
    try{
      let res: APIarray<checkIn> = await lastValueFrom(
        this.fileService.checkIn(this.groupName,this.checkInFiles)
      );
      this.checkInRes=res.data;
    this.download(this.checkInFiles,fileName);
      console.log("checkIn true",res.data);
    }
    catch (error){
      console.log(error);
    }
  }

  async viewChanges(fileId?:number) {
    try {
      let res: APIarray<file_changes> = await lastValueFrom(
        this.fileService.compareFiles(this.groupName,fileId)
      );
      this.fileChanges = res.data;
      console.log(this.fileChanges );
    } catch (error) {
      console.log(error);
    }
  }
  async viewFileDetails(fileId?:number) {
    try {
      let res: APIarray<fileDetails> = await lastValueFrom(
        this.fileService.viewFileDetails(this.groupName,fileId)
      );
      this.fileDetailsInfo = res.data;
      console.log(this.fileDetailsInfo );
      
    } catch (error) {
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
  seFi:File = {} as File;
  onFileSelected(event:any){
    this.currentFile = event.target.files[0];
    this.selectedFiles = event.target.files;
    this.uploadForm.patchValue({'file_path[]':this.selectedFiles[0]});
    this.seFi = event.target.files[0];
  }
  uploadFiles(){
    const reqOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'http://localhost:4200',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials':'true'
      })
    }
    const formData = new FormData();

    if(this.currentFile){
      formData.append("file",this.currentFile);
    }
  
    this.http.post(`http://localhost/api/${this.groupName}/upload-file`,formData , reqOptions)
    .subscribe({
      next:(res)=>{
        console.log('success',res);
      }, error:(error)=>{
       console.log(error);
      }
    })



    // if (this.selectedFiles.length === 0) return; 
    
    // const formData = new FormData();

    // console.log(this.selectedFiles[0]);
    // console.log();

    // formData.append('file_path[]', 'this.selectedFiles[0]');
    // formData.append('file_path', 'this.selectedFiles[0]');

    // formData.append('test', 'fi1');

    // console.log(formData.get('test'));
    // console.log(formData.get('file_path[]'));

    // // this.selectedFiles.forEach(file => {
    // //   formData.append('file_path[]', file); // Use 'file_path[]' to match backend expectation
    // // });
    // this.http.post<any>(`http://127.0.0.1:8000/api/${this.groupName}/upload-file`,formData)
    // .subscribe({
    //   next:(res)=>{
    //     console.log('success',res);
    //   }, error:(error)=>{
    //    console.log(error);
    //   }
    // })
  }
}
