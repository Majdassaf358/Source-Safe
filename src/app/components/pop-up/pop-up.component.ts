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
import { HttpClient } from '@angular/common/http';
import { environment } from '../../models/environments';
import { viewgroup } from '../../models/viewgroup';
import { MessagesService } from '../../services/messages.service';
import { AuthenticationService } from '../../services/authentication.service';
import { profile } from '../../models/profile';

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

  groups: viewgroup[] = [];
  groupForm!: FormGroup;
  groupName: string = '';
  inviteInfo: sendinvite[] = [];
  selectedFiles: File[] = [];
  uploadedFiles: file[] = [];
  profile: profile = new profile();

  constructor(
    private http: HttpClient,
    private groupService: GroupsService,
    private filesService: FilesService,
    private userService: UsersService,
    private messageService: MessagesService,
    private profileService: AuthenticationService,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges) {
    this.getMyGroups();
    this.getProfile();
  }
  showMessage(message: string) {
    this.messageService.show(message);
  }
  removeSideDisplay() {
    this.show = false;
  }

  async getProfile() {
    try {
      let res: ApiResponse<profile> = await lastValueFrom(
        this.profileService.getProfile()
      );
      this.profile = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getMyGroups() {
    try {
      let res: APIarray<viewgroup> = await lastValueFrom(
        this.groupService.getMyGroups()
      );
      this.groups= res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async crateGroupFunction() {
    try {
      let res: ApiResponse<groupRes> = await lastValueFrom(
        this.groupService.createGroup(this.groupName)
      );
      this.show = false;
      this.showMessage('Group created');
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
      this.showMessage(`${res.message}`);
      this.show = false;
    } catch (error) {
      console.log(error);
    }
  }
  
}
