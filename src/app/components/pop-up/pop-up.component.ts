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
  fileInfo: file[] = [];

  // Variable to store shortLink from api response
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  // file
  public files: NgxFileDropEntry[] = [];

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
  onChange(event: any) {
    const file = event.target.files;
    const formData = new FormData();
    formData.append('file', file);
    this.sendFiles(file);
  }
  async sendFiles(formData: any) {
    // console.log(formData);
    try {
      let res: APIarray<file> = await lastValueFrom(
        this.filesService.uploadFile(this.groupName, formData)
      );
      this.fileInfo = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  onUpload() {}

  // OnClick of button Upload
  dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          const formData = new FormData();
          formData.append('file', file, droppedFile.relativePath);
          this.sendFiles(formData);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }
}
