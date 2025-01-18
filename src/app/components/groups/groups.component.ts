import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { APIarray } from '../../models/APIarray';
import { viewgroup } from '../../models/viewgroup';
import { lastValueFrom } from 'rxjs';
import { GroupsService } from '../../services/groups.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MessagesService } from '../../services/messages.service';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationService } from '../../services/authentication.service';
import { profile } from '../../models/profile';
import { ApiResponse } from '../../models/ApiResponse';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [PopUpComponent, FormsModule, CommonModule, RouterModule,
    TranslateModule,
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css',
})
export class GroupsComponent implements OnInit {
  showPopUp: boolean = false;
  displayPopUp: string = '';
  groups: viewgroup[] = [];
  mode:string = '';
  profile: profile = new profile;

  constructor(private groupService: GroupsService,
    private route: ActivatedRoute,
    private profileService: AuthenticationService,
    private notificationService: MessagesService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsMap) => {
      this.mode = paramsMap.get('allOrMy') || '';
      if (this.mode == 'all') {
        this.getGroups();
      } else {
        this.getMyGroups();
      }
    });
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
  
    showMessage(message: string) {
      this.notificationService.show(message);
    }
  openPopUpUpload() {
    this.showPopUp = true;
    this.displayPopUp = 'upload';
  }
  openPopUpCreate() {
    this.showPopUp = true;
    this.displayPopUp = 'create';
  }

  async getMyGroups() {
    try {
      let res: APIarray<viewgroup> = await lastValueFrom(
        this.groupService.getMyGroups()
      );
      this.groups = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getGroups() {
    try {
      let res: APIarray<viewgroup> = await lastValueFrom(
        this.groupService.getGroups()
      );
      this.groups = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  deletegroup(){
    
  }

 
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as Element;
    if (!targetElement.closest('app-pop-up')) {
      this.showPopUp = false;
    }
  }
}
