import { Component, OnInit } from '@angular/core';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { viewuser } from '../../models/viewuser';
import { lastValueFrom } from 'rxjs';
import { APIarray } from '../../models/APIarray';

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
  users: viewuser[] = [];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    try {
      let res: APIarray<viewuser> = await lastValueFrom(
        this.userService.getUsers()
      );
      this.users = res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
