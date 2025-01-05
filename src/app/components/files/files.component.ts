import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { APIarray } from '../../models/APIarray';
import { viewfile } from '../../models/viewfile';
import { FilesService } from '../../services/files.service';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { error } from 'console';
import { checkIn } from '../../models/check-in';
import { fileUpload } from '../../models/file-upload';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css'
})
export class FilesComponent implements OnInit{

  groupName: string = '';
    mode:string='default';
    tem:string='';
    files: viewfile[] = [];
    checkInFiles: number[]= [];
    checkInRes:checkIn[] = [];
    uploadForm !: FormGroup;
    currentFile !: File;

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

  addNumberToCheckIn(id?:number){
    this.checkInFiles.push(id || 0);
    this.checkIn();
  }

  async checkIn(){
    try{
      let res: APIarray<checkIn> = await lastValueFrom(
        this.fileService.checkIn(this.groupName,this.checkInFiles)
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

  seFi:File = {} as File;

  onFileSelected(event:any){
    // this.selectedFiles = Array.from(event.target.files);
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
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        Authorization: 'Bearer 5|UCiF4PiheqiSBLwqnDV4YSu7PQqaO7sJXE9yH14ra8e63381'
      })
    }
    const formData = new FormData();

    if(this.currentFile){
      formData.append("file",this.currentFile);
    }
  

    // formData.append('file_path[]',this.selectedFiles[0],this.selectedFiles[0].name);
    // console.log('here');

    this.http.post(`http://localhost/api/${this.groupName}/upload-file`,formData)
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
