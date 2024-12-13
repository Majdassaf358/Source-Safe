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

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [PopUpComponent, FormsModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  showPopUp: boolean = false;
  display: string = '';
  groupName: string = '';
  users: viewuser[] = [];
  groupUsers: users = new users();
  selected: boolean[] = [];

  users_id: number[] = [];
  mode: string = '';
  selectAll: boolean = false;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramsMap) => {
      this.groupName = paramsMap.get('groupName') || '';
      if (this.groupName == 'all') {
        this.mode = 'default';
        this.getAllUsers();
      } else {
        this.mode = 'default';
        this.getGroupUsers(this.groupName);
      }
    });
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
  checkBoxChanged(i: number) {
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

  async getGroupUsers(name: string) {
    try {
      let res: ApiResponse<users> = await lastValueFrom(
        this.userService.getGroupUsers(name)
      );
      this.groupUsers = res.data;
      this.users = this.groupUsers.users || [];
      this.selected = new Array(this.users.length).fill(false);
      console.log(this.groupUsers);
    } catch (error) {
      console.log(error);
    }
  }
  openInvite() {
    this.showPopUp = true;
    this.display = 'invite';
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as Element;
    if (!targetElement.closest('app-pop-up')) {
      this.showPopUp = false;
    }
  }
}
