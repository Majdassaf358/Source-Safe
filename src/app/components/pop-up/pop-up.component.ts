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
import { invite } from '../../models/invite';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css',
})
export class PopUpComponent implements OnChanges {
  @Input() show?: boolean;
  @Input() display?: string;
  @Input() users_id!: number[];

  groupForm!: FormGroup;
  groupName: string = '';
  inviteInfo: invite[] = [];

  // Variable to store shortLink from api response
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file?: File;

  constructor(
    private fb: FormBuilder,
    private groupService: GroupsService,
    private filesService: FilesService,
    private userService: UsersService,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges) {}

  removeSideDisplay() {
    this.show = false;
  }

  async onChangeFile(event: any) {
    try {
    } catch (error) {
      console.log(error);
    }
  }
  initializeGroups() {
    this.groupForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
  initializeMember() {}

  // crateGroupAll() {
  //   this.initializeGroups();
  //   this.crateGroupFunction();
  // }
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
      let res: APIarray<invite> = await lastValueFrom(
        this.userService.inviteUser(this.groupName, this.users_id)
      );
      this.inviteInfo = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.filesService.upload(this.file).subscribe((event: any) => {
      if (typeof event === 'object') {
        // Short link via api response
        this.shortLink = event.link;

        this.loading = false; // Flag variable
      }
    });
  }
  onChange(event: any) {
    this.file = event.target.files[0];
  }
}
