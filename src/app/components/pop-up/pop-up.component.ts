import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { groupReq } from '../../models/groupReq';
import { groupRes } from '../../models/groupRes';
import { ApiResponse } from '../../models/ApiResponse';
import { GroupsService } from '../../services/groups.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { FilesService } from '../../services/files.service';
import { APIarray } from '../../models/APIarray';
import { file } from '../../models/file';
import { sendinvite } from '../../models/sendinvite';
import { UsersService } from '../../services/users.service';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgxFileDropModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css',
})
export class PopUpComponent implements OnChanges {
  @Input() show?: boolean;
  @Input() display?: string;
  @Input() users_ids!: number[];

  groupForm!: FormGroup;
  groupName: string = '';
  inviteInfo: sendinvite[] = [];
  selectedFiles: File[] = [];
  uploadedFiles: file[] = [];

  constructor(
    private groupService: GroupsService,
    private filesService: FilesService,
    private userService: UsersService,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges) {}

  removeSideDisplay() {
    this.show = false;
  }

  async crateGroupFunction() {
    try {
      let res: ApiResponse<groupRes> = await lastValueFrom(
        this.groupService.createGroup(this.groupName)
      );
      console.log(res.message);
      this.show = false;
    } catch (error) {
      console.log(error);
    }
  }
  async sendInvite() {
    try {
      let res: APIarray<sendinvite> = await lastValueFrom(
        this.userService.inviteUser(this.groupName, this.users_ids)
      );
      this.inviteInfo = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  onChange(event: any) {}

  onUpload(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  //   async uploadFiles() {
  //     const formData = new FormData();
  //     this.selectedFiles.forEach((file) => {
  //       formData.append('file_path', file);
  //     });
  //     let res: any = await lastValueFrom(this.filesService.uploadFile(formData));
  //     console.log(res);
  //   }
  // }
  async uploadFiles() {
    const formData = new FormData();
    this.selectedFiles.forEach((file) => {
      formData.append('file_path[]', file); // Note the array notation if multiple files are expected
    });
    try {
      let res: any = await lastValueFrom(
        this.filesService.uploadFile(formData)
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}
