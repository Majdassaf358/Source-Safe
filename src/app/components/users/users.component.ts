import { Component, OnInit } from '@angular/core';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';

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
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}
}
