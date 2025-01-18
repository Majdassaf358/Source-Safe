import { Component, HostListener, OnInit } from '@angular/core';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { viewuser } from '../../models/viewuser';
import { lastValueFrom } from 'rxjs';
import { APIarray } from '../../models/APIarray';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../../models/ApiResponse';
import { users } from '../../models/users';
import { profile } from '../../models/profile';
import { AuthenticationService } from '../../services/authentication.service';
import { MessagesService } from '../../services/messages.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { group_admin } from '../../models/group_admin';
import { TranslateModule } from '@ngx-translate/core';
import { nodata } from '../../models/nodata';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [PopUpComponent, FormsModule, CommonModule,TranslateModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  showPopUp: boolean = false;
  display: string = '';
  groupName: string = '';
  users: viewuser[] = [];
  groupAdmin?:group_admin[]=[];
  groupUsers: users = new users();
  selected: boolean[] = [];

  users_id: number[] = [];
  mode: string = '';
  selectAll: boolean = false;
  profile: profile = new profile;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private profileService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.route.paramMap.subscribe((paramsMap) => {
      this.groupName = paramsMap.get('groupName') || '';
      if (this.groupName == 'all') {
        this.mode = 'default';
        this.getAllUsers();
      } else {
        this.mode = 'noInvite';
        this.getGroupUsers(this.groupName);
      }
      console.log(this.mode);
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
  showMessage(message: any) {
    this.messageService.show(message);
  }
  enableSelect() {
    this.mode = 'select';
  }
  desaibleSelect() {
    this.mode = 'default';
  }
  toglleSelectAll() {
    this.selected = this.users.map(() => this.selectAll);
    this.updateSelectedUsers();
  }
  checkBoxChanged() {
    this.selectAll = this.selected.every((isSelected) => isSelected);
    this.updateSelectedUsers();
  }
  updateSelectedUsers() {
    this.users_id = this.users.reduce<number[]>((acc, user, index) => {
      if (this.selected[index] && typeof user.id === 'number') {
        acc.push(user.id);
      }
      return acc;
    }, []);
  }

  async getAllUsers() {
    try {
      let res: APIarray<viewuser> = await lastValueFrom(
        this.userService.getUsers()
      );
      this.users = res.data;
      this.selected = new Array(this.users.length).fill(false);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteUser(userName?:string) {
    try {
      let res: ApiResponse<nodata> = await lastValueFrom(
        this.userService.kickFromGroup(this.groupName,userName)
      );
      this.showMessage('User Got Kicked');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async getGroupUsers(name: string) {
    try {
      let res: ApiResponse<users> = await lastValueFrom(
        this.userService.getGroupUsers(name)
      );
      this.groupUsers = res.data;
      this.groupAdmin = this.groupUsers.admin;
      this.users = this.groupUsers.users || [];
      this.selected = new Array(this.users.length).fill(false);
    } catch (error) {
      this.showMessage(error)
      if (error instanceof HttpErrorResponse) {
        this.showMessage(error.error.message || 'An error occurred');
        this.router.navigate(['/groups','all']);
      }
      else console.log(error);
    }
  }
  openInvite() {
    this.showPopUp = true;
    this.display = 'invite';
  }
  async exitgroup(){
    try {
      let res: ApiResponse<nodata> = await lastValueFrom(
        this.userService.exitGroup(this.groupName)
      );
      this.showMessage('You Exited The Group');
      this.router.navigate(['/groups','all']);  
    } catch (error) {
      console.log(error);
    }
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as Element;
    if (!targetElement.closest('app-pop-up')) {
      this.showPopUp = false;
    }
  }
}
